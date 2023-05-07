import { World, Engine, Runner, Events, IEventCollision, Body } from 'matter-js';
import P5, { Vector } from 'p5';
import Player from './Player';
import Timer from './Timer';
import { v4 as uuidv4 } from 'uuid';
import CellManager from './CellManager';
import Cell from './Cell';

interface ScreenSize
{
    width: number;
    height: number;
}

interface Segment
{
    x: number;
    y: number;
    length: number;
    angle: number;
}

export interface BaseOptions
{
    x?: number;
    y?: number;
    position?: Vector;
    rotation?: number;
}

export class Globals
{
    private static p5: P5;
    private static screenSize: ScreenSize;
    private static colors: string[];
    private static engine: Engine;
    private static world: World;
    private static runner: Runner;
    private static player: Player;
    private static playerSwapTimer: Timer;

    public static initilize(p5: P5, screenSize: ScreenSize): void
    {
        Globals.p5 = p5;
        Globals.screenSize = screenSize;
        Globals.colors = ["#2ecc71", "#3498db", "#9b59b6", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ff7979", "#3c40c6"];

        Globals.engine = Engine.create({gravity: {x: 0, y: 0}});
        Globals.world = Globals.engine.world;
        Globals.runner = Runner.create();

        Runner.run(Globals.runner,  Globals.engine);

        Globals.player = new Player(p5.createVector(), 50); 

        Globals.playerSwapTimer = new Timer(1, () => 3000, () => Globals.player.swap(), true);
        Globals.playerSwapTimer.start();

        Events.on(Globals.engine, "collisionActive", (e) => Globals.handleCollision(e));
        Events.on(Globals.engine, "collisionStart", (e) => Globals.handleCollision(e));
    }
   
    public static randomColor(): string
    {
        return Globals.colors[Math.floor(Math.random() * Globals.colors.length)];
    }

    public static randomCellRadius(): number
    {
        return Math.floor(Globals.getP5().random(20, 60));
    }

    public static randomPointCircle(center: Vector, radius: number): Vector
    {
        let r: number = radius * Math.sqrt(Math.random());
        let theta: number = Math.random() * 2 * Globals.getP5().PI;

        let x: number = center.x + r * Math.cos(theta);
        let y: number = center.y + r * Math.sin(theta);

        return Globals.getP5().createVector(x, y);
    }

    public static randomDirection(center: Vector, radius: number): Vector
    {
        let r: number = radius * Math.sqrt(Math.random());
        let theta: number = Math.random() * Globals.getP5().PI;

        let x: number = center.copy().x + r * Math.cos(theta);
        let y: number = center.copy().y + r * Math.sin(theta);

        return Globals.getP5().createVector(x, y).normalize();
    }

    public static generateUUID(): string
    {
        return uuidv4();
    }

    public static polygonSegements(center: Vector, n: number, radius: number): Segment[]
    {
        let segments: Segment[] = [];
        let vertices: Vector[] = [];

        if(!(n >= 3)) return [];

        for(let a = 0; a < 360; a += (360 / n))
        {
            let x = center.x + radius * Math.cos(Globals.getP5().radians(a));
            let y = center.y + radius * Math.sin(Globals.getP5().radians(a));

            vertices.push(Globals.getP5().createVector(x, y));
        }
        vertices.push(vertices[0]);

        for(let i = 0; i < vertices.length - 1; i++)
        {
            let x1 = vertices[i].x;
            let y1 = vertices[i].y;
            let x2 = vertices[i + 1].x;
            let y2 = vertices[i + 1].y;
            
            let x = (x1 + x2) / 2;
            let y = (y1 + y2) / 2;

            let slope = (y2 - y1) / (x2 - x1);
            let angle = Math.atan(slope) + Globals.getP5().radians(180);

            segments.push({ x, y, angle, length: Globals.getP5().dist(x1, y1, x2, y2)});
        }


        return segments;
    }

    public static getOptionsPosition(options: BaseOptions): Vector
    {
        let x: number = options.x || 0;
        let y: number = options.y || 0;
        let position: Vector = options.position || Globals.getP5().createVector(x, y);

        return position;
    }

    private static handleCollision(e: IEventCollision<Engine>)
    {
        for(let pair in e.pairs)
        {
            const bodyA: Body = e.pairs[pair].bodyA;
            const bodyB: Body = e.pairs[pair].bodyB;

            if(bodyA.label.includes("Player-") && bodyB.label.includes("Cell-"))
            {
                let cell: Cell | undefined = CellManager.getByLabel(bodyB.label);
                if(cell instanceof Cell) Globals.getPlayer().collidedWith(cell);
            }

            if(bodyA.label.includes("Cell-") && bodyB.label.includes("Player-"))
            {
                let cell: Cell | undefined = CellManager.getByLabel(bodyA.label);
                if(cell instanceof Cell) Globals.getPlayer().collidedWith(cell);
            }
        } 
    }

    public static resizeScreen(screenSize: ScreenSize): void
    {
        Globals.screenSize = screenSize;

        Globals.getP5().resizeCanvas(screenSize.width, screenSize.height);
    }

    public static getP5(): P5
    {
        return Globals.p5;
    }

    public static getScreenSize(): ScreenSize
    {
        return Globals.screenSize;
    }

    public static getWorld(): World
    {
        return Globals.world;
    }

    public static getPlayer(): Player
    {
        return Globals.player;
    }

    public static getPlayerTimerTime()
    {
        return Globals.getP5().map(Globals.playerSwapTimer.getCurrentTime(), 0, Globals.playerSwapTimer.getLength(), 360, 0);
    }
    
    public static random2D() 
    {
        return this.fromAngle(Math.random() * Globals.getP5().TWO_PI);
    }
    
    public static fromAngle(angle: number, length: number = 1) 
    {
        return Globals.getP5().createVector(length * Math.cos(angle), length * Math.sin(angle), 0);
    }
}