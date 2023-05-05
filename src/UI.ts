import { Vector } from "p5";
import { BaseOptions, Globals } from "./Globals";
import { Canvas } from "./Canvas";

interface LabelOptions extends BaseOptions
{
    text?: string;
    size?: number;
    color?: string;
    backgroundColor?: string;
    padding?: number;
}

export default class UI
{
    private static centerPosition: Vector;

    public static attach(centerPosition: Vector)
    {
        UI.centerPosition = centerPosition
    }

    public static label(options: LabelOptions)
    {
        let offset: Vector = Globals.getOptionsPosition(options);
        let text: string = options.text || "";
        let size: number = options.size || 12;
        let color: string = options.color || "#ffffff";
        let backgroundColor: string = options.backgroundColor || "#141414";
        let padding: number = options.padding || 5;

        Globals.getP5().textSize(size);

        let textWidth = Globals.getP5().textWidth(text);
        let textHeight = Globals.getP5().textSize();

        let width = textWidth + (padding * 2);
        let height = textHeight + (padding * 2);
        
        

        let position = UI.centerPosition.copy().add(offset).add(offset.x == 0 ? 0 : width / 2, offset.y == 0 ? 0 : height / 2);
        let textPosition = Globals.getP5().createVector(position.x - textWidth / 2, position.y + textHeight / 3);

        Canvas.rect({ position, width, height, cornerRadius: 10 }, { fill: backgroundColor, alpha: 150 });
        Canvas.text({ position: textPosition, text, size }, { fill: color });
    }
}