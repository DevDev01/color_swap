import { Body } from "matter-js";
import { Globals } from "./Globals";
import PhysicsBody from "./PhysicsBody";
import { Vector } from "p5";
import { Canvas } from './Canvas';
import Cell from "./Cell";

export default class Player
{
    private radius: number;
    
    private body: Body;
    private label: string;
    private color: string;
    private targetPosition: Vector;
    private speed: number;
    private showTarget: boolean;
    private timerProgress: number;
    private score: number;

    constructor(position: Vector, radius: number)
    {
        this.radius = radius;

        this.body = PhysicsBody.circle(position, radius, { restitution: 0.9 });
        this.label = `Player-${Globals.generateUUID()}`;
        this.color = Globals.randomColor();
        this.targetPosition = position;
        this.speed = 6;
        this.showTarget = false;
        this.timerProgress = 0;
        this.score = 0;

        this.body.label = this.label;

        console.log(this.body);
    }

    public draw()
    {
        if(this.showTarget) Canvas.line({ startPosition: this.getPosition(), endPosition: this.targetPosition }, { stroke: this.color, strokeWeight: 5, dashArray: [10, 10] });
        if(this.showTarget) Canvas.circle({ position: this.targetPosition, radius: 10 }, { fill:  this.color, shade: -0.1 });

        Canvas.circle({ position: this.getPosition(), radius: this.radius }, { fill: this.color, shade: -0.1, blur: 32, blurColor: this.color });
        Canvas.circle({ position: this.getPosition(), radius: this.radius - 10 }, { fill: this.color });  

        Canvas.arc({ position: this.getPosition(), radius: this.radius, angle: this.timerProgress }, { stroke: this.color, strokeWeight: 4 });
    }

    public move()
    {
        let dir = this.targetPosition.copy().sub(this.getPosition().copy());
        let norm = dir.normalize();

        if(Globals.getP5().dist(this.getPosition().x, this.getPosition().y, this.targetPosition.x, this.targetPosition.y) >= this.radius)
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

    public swap()
    {
        this.color = Globals.randomColor();
    }

    public collidedWith(cell: Cell)
    {
        if(cell.getColor() == this.color)
        {
            cell.damage(10);
        }
    }

    public addScore(score: number)
    {
        this.score += score;
    }

    public setTarget(position: Vector)
    {
        this.targetPosition = position;
    }

    public setTimerProgress(timerProgress: number)
    {
        this.timerProgress = timerProgress;
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

    public getScore(): number
    {
        return this.score;
    }
}