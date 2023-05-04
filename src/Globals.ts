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
   
    public static shadeHexColor(color: string, percent: number): string
    {
        var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
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