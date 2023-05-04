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
    
    private color: string;
    private targetPosition: Vector;
    private speed: number;
    private showTarget: boolean;

    constructor(position: Vector, radius: number)
    {
        this.body = PhysicsBody.circle(position, radius);
        this.radius = radius;
        this.position = Globals.getP5().createVector(this.body.position.x, this.body.position.y);

        this.color = Globals.randomColor();
        this.targetPosition = this.position.copy();
        this.speed = 6;
        this.showTarget = false;
    }

    public update()
    {
        this.position = Globals.getP5().createVector(this.body.position.x, this.body.position.y);
    }

    public draw()
    {
        if(this.showTarget) Canvas.line({ startPosition: this.position, endPosition: this.targetPosition }, { stroke: this.color, strokeWeight: 5, dashArray: [10, 10] });
        if(this.showTarget) Canvas.circle({ position: this.targetPosition, radius: 10 }, { fill:  this.color, shade: -0.1 });

        Canvas.circle({ position: this.position, radius: this.radius }, { fill: this.color, shade: -0.1, blur: 32, blurColor: this.color });
        Canvas.circle({ position: this.position, radius: this.radius - 10 }, { fill: this.color });  
    }

    public move()
    {
        let dir = this.targetPosition.copy().sub(this.position.copy());
        let norm = dir.normalize();

        if(Globals.getP5().dist(this.body.position.x, this.body.position.y, this.targetPosition.x, this.targetPosition.y) >= this.radius / 2)
        {
            let velocity: Vector = norm.mult(this.speed).copy();
            Body.setVelocity(this.body, {x: velocity.x, y: velocity.y});
            this.showTarget = true;
        }
        else
        {
            Body.setVelocity(this.body, {x: 0, y: 0});
            this.showTarget = false;
        }
    }

    public setTarget(position: Vector)
    {
        this.targetPosition = position;
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