import { Vector } from "p5";
import Globals from "./Globals";


interface StyleOptions
{
    fill?: string | boolean;
    stroke?: string | boolean;
    strokeWeight?: number;
}

interface SharedOptions
{
    x?: number;
    y?: number;
    position?: Vector;
}

interface RectOptions extends SharedOptions
{
    width?: number;
    height?: number;
    cornerRadius?: number;
}

interface CircleOptions extends SharedOptions
{
    radius?: number;
}

export default class Canvas
{
    public static background(color: string)
    {
        Globals.getP5().background(color);
    }

    public static translate(position: Vector)
    {
        Globals.getP5().translate(position.x, position.y);
    }

    public static rect(options: RectOptions, style: StyleOptions): void
    {
        let position: Vector = Canvas.generatePosition(options);
        let width: number = options.width || 0;
        let height: number = options.height || 0;
        let cornerRadius: number = options.cornerRadius || 0;

        Canvas.applyStyle(style);
        Globals.getP5().rect(position.x, position.y, width, height, cornerRadius);
    }

    public static circle(options: CircleOptions, style: StyleOptions)
    {
        let position: Vector = Canvas.generatePosition(options);
        let radius: number = options.radius || 0;

        Canvas.applyStyle(style);
        Globals.getP5().ellipse(position.x, position.y, radius * 2, radius * 2);
    }

    private static generatePosition(options: SharedOptions): Vector
    {
        let x: number = options.x || 0;
        let y: number = options.y || 0;
        let position: Vector = options.position || Globals.getP5().createVector(x, y);

        return position;
    }
    private static applyStyle(style: StyleOptions)
    {
        let fill: string | boolean = style.fill || false;
        let stroke: string | boolean = style.stroke || false;
        let strokeWeight: number = style.strokeWeight || 1;

        fill ? Globals.getP5().fill(fill as string) : Globals.getP5().noFill();
        stroke ? Globals.getP5().stroke(stroke as string) : Globals.getP5().noStroke();
        Globals.getP5().strokeWeight(strokeWeight);
    }
}