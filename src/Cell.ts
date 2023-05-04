import { Vector } from "p5";
import Globals from "./Globals";
import { Body } from "matter-js";
import PhysicsBody from "./PhysicsBody";
import Canvas from "./Canvas";

interface CellOptions
{
    position?: Vector;
    radius?: number;
    color?: string;
}

export default class Cell
{
    private position: Vector;
    private radius: number;
    private color: string;

    private body: Body;

    constructor(options: CellOptions = {})
    {
        this.position = options.position || Globals.randomPosition();
        this.radius = options.radius || Globals.randomCellRadius();
        this.color = options.color || Globals.randomColor();

        this.body = PhysicsBody.circle(this.position, this.radius, { restitution: 0.9 });
    }

    public update()
    {
        this.position = Globals.getP5().createVector(this.body.position.x, this.body.position.y);
    }

    public draw()
    {
        Canvas.circle({ position: this.position, radius: this.radius }, { fill: this.color, shade: -0.1, blur: 32, blurColor: this.color });
        Canvas.circle({ position: this.position, radius: this.radius - 10 }, { fill: this.color }); 
    }
}