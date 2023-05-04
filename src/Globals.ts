import { World, Engine, Runner, Events, IEventCollision, Body } from 'matter-js';
import P5, { Vector } from 'p5';
import Player from './Player';
import Timer from './Timer';

interface ScreenSize
{
    width: number;
    height: number;
}

export default class Globals
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

        Globals.playerSwapTimer = new Timer(1, () => 1000, () => Globals.player.swap(), true);
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

    public static randomPosition(): Vector
    {
        return Globals.getP5().createVector(Globals.getP5().random(-1000, 1000), Globals.getP5().random(-1000, 1000));
    }

    private static handleCollision(e: IEventCollision<Engine>)
    {
        for(let pair in e.pairs)
        {
            const bodyA: Body = e.pairs[pair].bodyA;
            const bodyB: Body = e.pairs[pair].bodyB;

            if(bodyA.label.includes("Player-") && bodyB.label.includes("Bubble-"))
            {
                //let normal = e.pairs[pair].collision.normal;

                let bubble: Bubble | undefined = getBubbleByLabel(bodyB.label);
                if(bubble instanceof Bubble) player.collidedWith(bubble);
            }

            if(bodyA.label.includes("Bubble-") && bodyB.label.includes("Player-"))
            {
                //let normal = e.pairs[pair].collision.normal;

                let bubble: Bubble | undefined = getBubbleByLabel(bodyA.label);
                if(bubble instanceof Bubble) player.collidedWith(bubble);
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
}