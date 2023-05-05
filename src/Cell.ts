import { Vector } from "p5";
import { Globals } from "./Globals";
import { Body } from "matter-js";
import PhysicsBody from "./PhysicsBody";
import { Canvas } from "./Canvas";
import CellManager from "./CellManager";

interface CellOptions
{
    position?: Vector;
    radius?: number;
    color?: string;
    canSplit?: boolean;
}

export default class Cell
{
    private position: Vector;
    private radius: number;
    private color: string;
    private canSplit: boolean;

    private body: Body;
    private label: string;
    private health: number;
    private firstHit: boolean;
    private showHealth: boolean;
    
    constructor(options: CellOptions = {})
    {
        this.position = options.position || Globals.randomPosition();
        this.radius = options.radius || Globals.randomCellRadius();
        this.color = options.color || Globals.randomColor();
        this.canSplit = options.canSplit || true;

        this.body = PhysicsBody.circle(this.position, this.radius, { restitution: 0.9 });
        this.label = `Cell-${Globals.generateUUID()}`;
        this.health = 100;
        this.firstHit = false;
        this.showHealth = false;
         
        this.body.label = this.label;
    }

    public draw()
    {
        Canvas.circle({ position: this.getPosition(), radius: this.radius }, { fill: this.color, shade: -0.1, blur: 32, blurColor: this.color });
        Canvas.circle({ position: this.getPosition(), radius: this.radius - 5 }, { fill: this.color }); 

        if(this.showHealth) Canvas.rect({ x: this.getX(), y: this.getY() - (this.radius + 10), width: 75, height: 5, cornerRadius: 5}, { fill: "#464646", alpha: 200 });
        if(this.showHealth) Canvas.rect({ x: this.getX(), y: this.getY() - (this.radius + 10), width: Globals.getP5().map(this.health, 0, 100, 0, 75), height: 5, cornerRadius: 5}, { fill: "#ff0000" });
    }

    public damage(hitPoints: number)
    {
        if(!this.firstHit) this.firstHit = true
        if(this.firstHit) this.showHealth = true; 
        
        if(this.health - hitPoints >= 0)
        {
            this.health -= hitPoints;
        }

        if(this.health - hitPoints < 0)
        {
            this.health = 0;
        }

        if(this.health == 0) this.explode();
    }

    private explode()
    {
        PhysicsBody.remove(this.body)
        if(this.canSplit)
        {
            for(let i = 0; i < 2; i++)
            {
                let canSplit = (this.radius * 0.8) > 20 ? true : false;
                let cell: Cell = new Cell({position: this.getPosition(), radius: this.radius * 0.8, color: this.color, canSplit});
                CellManager.add(cell)
            }
        }
        CellManager.remove(this);
        Globals.getPlayer().addScore(1);
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

    public getLabel(): string
    {
        return this.label;
    }

    public getColor(): string
    {
        return this.color;
    }
}