import { Body } from "matter-js";
import PhysicsBody from "./PhysicsBody";
import { Vector } from "p5";
import { Globals } from "./Globals";
import { Canvas } from "./Canvas";

export default class Wall
{
    private width: number;
    private height: number;

    private body: Body;
    private label: string;
    private color: string;
    
    constructor(position: Vector, width: number, height: number, rotation: number)
    {
        this.width = width;
        this.height = height;

        this.body = PhysicsBody.rect(position, width, height, { isStatic: true, angle: rotation });
        this.label = `Wall-${Globals.generateUUID()}`;
        this.color = "#282828";

        this.body.label = this.label;
    }

    public draw()
    {
        Canvas.rect({ position: this.getPosition(), width: this.width, height: this.height, rotation: this.body.angle }, { fill: this.color });
    }

    public getX(): number
    {
        return this.body.position.x;
    }

    public getY(): number
    {
        return this.body.position.y;
    }

    public getPosition(): Vector
    {
        return Globals.getP5().createVector(this.body.position.x, this.body.position.y);
    }
}