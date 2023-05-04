import { Vector } from "p5";
import Globals from "./Globals";


interface StyleOptions
{
    fill?: string | boolean;
    stroke?: string | boolean;
    strokeWeight?: number;
    shade?: number;
    dashArray?: number[];
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

interface LineOptions
{
    x1?: number;
    y1?: number;
    startPosition?: Vector;
    x2?: number;
    y2?: number;
    endPosition?: Vector;
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

    public static customCursor(position: Vector, radius: number, pressed: boolean)
    {
        Globals.getP5().noCursor();
        if(!pressed) Canvas.circle({ position, radius }, { stroke: "#464646", strokeWeight: 4 });
    }

    public static rect(options: RectOptions, style: StyleOptions): void
    {
        let position: Vector = Canvas.generatePosition(options);
        let width: number = options.width || 0;
        let height: number = options.height || 0;
        let cornerRadius: number = options.cornerRadius || 0;

        Canvas.applyStyle(style);

        Globals.getP5().push();
        Canvas.translate(Globals.getP5().createVector());
        Globals.getP5().rect(position.x, position.y, width, height, cornerRadius);
        Globals.getP5().pop();
    }

    public static circle(options: CircleOptions, style: StyleOptions)
    {
        let position: Vector = Canvas.generatePosition(options);
        let radius: number = options.radius || 0;

        Canvas.applyStyle(style);

        Globals.getP5().push();
        Canvas.translate(Globals.getP5().createVector());
        Globals.getP5().ellipse(position.x, position.y, radius * 2, radius * 2);
        Globals.getP5().pop();
    }

    public static line(options: LineOptions, style: StyleOptions)
    {
        let x1: number = options.x1 || 0;
        let y1: number = options.y1 || 0;
        let startPosition: Vector = options.startPosition || Globals.getP5().createVector(x1, y1);
        let x2: number = options.x2 || 0;
        let y2: number = options.y2 || 0;
        let endPosition: Vector = options.endPosition || Globals.getP5().createVector(x2, y2);

        Canvas.applyStyle(style);

        Globals.getP5().push();
        Canvas.translate(Globals.getP5().createVector());
        Globals.getP5().line(startPosition.x, startPosition.y, endPosition.x, endPosition.y);
        Globals.getP5().pop();
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
        let shade: number = style.shade || 0;
        let dashArray: number[] = style.dashArray || [0, 0];

        fill ? Globals.getP5().fill(Globals.shadeHexColor(fill as string, shade)) : Globals.getP5().noFill();
        stroke ? Globals.getP5().stroke(Globals.shadeHexColor(stroke as string, shade)) : Globals.getP5().noStroke();
        Globals.getP5().strokeWeight(strokeWeight);
        Canvas.setLineDash(dashArray);
    }

    private static setLineDash(dashArray: number[])
    {
        Globals.getP5().drawingContext.setLineDash(dashArray);
    }
}