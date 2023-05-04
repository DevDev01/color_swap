import { World, Engine, Runner } from 'matter-js';
import P5 from 'p5';
import Player from './Player';

interface ScreenSize
{
    width: number;
    height: number;
}

export default class Globals
{
    private static p5: P5;
    private static screenSize: ScreenSize;
    private static engine: Engine;
    private static world: World;
    private static runner: Runner;
    private static player: Player;

    public static initilize(p5: P5, screenSize: ScreenSize): void
    {
        Globals.p5 = p5;
        Globals.screenSize = screenSize;

        Globals.engine = Engine.create({gravity: {x: 0, y: 0}});
        Globals.world = Globals.engine.world;
        Globals.runner = Runner.create();

        Runner.run(Globals.runner,  Globals.engine);

        Globals.player = new Player(p5.createVector(), 50);
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
}