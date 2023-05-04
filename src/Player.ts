import { Body } from "matter-js";
import Globals from "./Globals";
import PhysicsBody from "./PhysicsBody";
import { Vector } from "p5";
import Canvas from './Canvas';

export default class Player
{
    private body: Body;
    private radius: number;
    private position: Vector;
    
    constructor(position: Vector, radius: number)
    {
        this.body = PhysicsBody.circle(position, radius);
        this.radius = radius;
        this.position = Globals.getP5().createVector(this.body.position.x, this.body.position.y);
    }

    public update()
    {
        this.position = Globals.getP5().createVector(this.body.position.x, this.body.position.y);
    }

    public draw()
    {
        Canvas.circle({ position: this.position, radius: this.radius }, { fill: "#e74c3c" });
    }

    public getX(): number
    {
        return this.position.x;
    }

    public getY(): number
    {
        return this.position.y;
    }

    public getPosition(): Vector
    {
        return this.position;
    }
}