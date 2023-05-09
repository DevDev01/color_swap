import { Vector } from "p5";
import { Globals, BaseOptions } from "./Globals";


interface StyleOptions
{
    fill?: string | boolean;
    stroke?: string | boolean;
    alpha?: number;
    strokeWeight?: number;
    shade?: number;
    dashArray?: number[];
    blur?: number;
    blurColor?: string;
}

interface RectOptions extends BaseOptions
{
    width?: number;
    height?: number;
    cornerRadius?: number;
}

interface CircleOptions extends BaseOptions
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

interface ArcOptions extends BaseOptions
{
    radius?: number;
    angle?: number
}

interface TextOptions extends BaseOptions
{
    text?: string;
    size?: number;
}

interface TriangleOptions extends BaseOptions
{
    length?: number;
}

export class Canvas
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
        let position: Vector = Globals.getOptionsPosition(options);
        let rotation: number = options.rotation || 0;
        let width: number = options.width || 0;
        let height: number = options.height || 0;
        let cornerRadius: number = options.cornerRadius || 0;

        Canvas.applyStyle(style);

        Globals.getP5().push();
        Canvas.translate(position);
        Globals.getP5().rotate(rotation);
        Globals.getP5().rect(0, 0, width, height, cornerRadius);
        Globals.getP5().pop();
    }

    public static circle(options: CircleOptions, style: StyleOptions)
    {
        let position: Vector = Globals.getOptionsPosition(options);
        let rotation: number = options.rotation || 0;
        let radius: number = options.radius || 0;

        Canvas.applyStyle(style);

        Globals.getP5().push();
        Canvas.translate(position);
        Globals.getP5().rotate(rotation);
        Globals.getP5().ellipse(0, 0, radius * 2, radius * 2);
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

    public static arc(options: ArcOptions, style: StyleOptions)
    {
        let position: Vector = Globals.getOptionsPosition(options);
        let radius: number = options.radius || 0;
        let angle: number = options.angle || 0;

        Canvas.applyStyle(style);

        Globals.getP5().push();
        Canvas.translate(Globals.getP5().createVector());
        Globals.getP5().arc(position.x, position.y, radius * 2, radius * 2, 0, Globals.getP5().radians(angle));
        Globals.getP5().pop();
    }

    public static triangle(options: TriangleOptions, style: StyleOptions)
    {
        let position: Vector = Globals.getOptionsPosition(options);
        let rotation: number = options.rotation || 0;
        let length: number = options.length || 0;

        let x1 = 0;
        let y1 = -length / 2;

        let x2 = length / 2;
        let y2 = length / 2;

        let x3 = -length / 2;
        let y3 = length / 2;

        let cx = (x1 + x2 + x3) / 3;
        let cy = (y1 + y2 + y3) / 3;

        Canvas.applyStyle(style);

        Globals.getP5().push();
        Canvas.translate(Globals.getP5().createVector(position.x + cx, position.y - cy));
        Globals.getP5().rotate(rotation);
        Globals.getP5().triangle(x1, y1, x2, y2, x3, y3);
        Globals.getP5().pop();      
    }

    public static text(options: TextOptions, style: StyleOptions)
    {
        let position: Vector = Globals.getOptionsPosition(options);
        let text: string = options.text || "";
        let size: number = options.size || 12;

        Canvas.applyStyle(style);

        Globals.getP5().push();
        Canvas.translate(Globals.getP5().createVector(position.x, position.y));
        Globals.getP5().textSize(size);
        Globals.getP5().text(text, 0, 0);
        Globals.getP5().pop();
    }

    public static shadeHexColor(color: string, percent: number): string
    {
        var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    }

    private static applyStyle(style: StyleOptions)
    {
        let fill: string | boolean = style.fill || false;
        let stroke: string | boolean = style.stroke || false;
        let alpha: number = style.alpha || 255;
        let strokeWeight: number = style.strokeWeight || 1;
        let shade: number = style.shade || 0;
        let dashArray: number[] = style.dashArray || [0, 0];
        let blur: number = style.blur || 0;
        let blurColor: string = style.blurColor || "#ffffff";

        fill ? Globals.getP5().fill(Canvas.shadeHexColor(fill as string, shade) + alpha.toString(16)) : Globals.getP5().noFill();
        stroke ? Globals.getP5().stroke(Canvas.shadeHexColor(stroke as string, shade) + alpha.toString(16)) : Globals.getP5().noStroke();
        Globals.getP5().strokeWeight(strokeWeight);
        Canvas.setLineDash(dashArray);
        Canvas.blur(blur, blurColor);
    }

    private static setLineDash(dashArray: number[])
    {
        Globals.getP5().drawingContext.setLineDash(dashArray);
    }

    private static blur(intensity: number, color: string)
    {
        Globals.getP5().drawingContext.shadowBlur = intensity;
        Globals.getP5().drawingContext.shadowColor = Globals.getP5().color(color);
    }
}