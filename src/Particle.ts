import { Vector } from "p5";
import { Globals } from "./Globals";
import Timer from "./Timer";
import { Canvas } from "./Canvas";

export default class Particle
{
    private position: Vector;
    private direction: Vector;
    private color: string;

    private radius: number;
    private lifeTime: number;
    private lifeTimer: Timer;
    private shouldDestroy: boolean;
    private speed: number;

    constructor(position: Vector, color: string)
    {
        this.position = position;
        this.color = color;

        this.direction = Vector.random2D();
        this.radius = Globals.getP5().random(2, 8);
        this.lifeTime = Math.floor(Globals.getP5().random(50, 100));
        this.lifeTimer = new Timer(1, () => this.lifeTime, () => this.run.call(this));
        this.shouldDestroy = false;
        this.speed = Globals.getP5().random(0.5, 1.5);

        this.lifeTimer.start();
    }

    public update()
    {
        this.position.add(this.direction.copy().mult(this.speed).copy());
    }

    public draw()
    {
        Canvas.circle({ position: this.position, radius: this.radius }, { fill: this.color });
    }

    private run()
    {
        this.speed = 0;
        this.shouldDestroy = true;
    }

    public getShouldDestroy()
    {
        return this.shouldDestroy;
    }
}