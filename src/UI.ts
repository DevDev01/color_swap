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
    centeredX?: boolean;
    centeredY?: boolean;
}

export default class UI
{
    private static position: Vector;

    public static attach(centerPosition: Vector)
    {
        UI.position = centerPosition.copy().sub(Globals.getScreenSize().width / 2, Globals.getScreenSize().height / 2)
    }

    public static label(options: LabelOptions)
    {
        let offset: Vector = Globals.getOptionsPosition(options);
        let text: string = options.text || "";
        let size: number = options.size || 25;
        let color: string = options.color || "#ffffff";
        let backgroundColor: string = options.backgroundColor || "#141414";
        let padding: number = options.padding || 10;
        let centeredX: boolean = options.centeredX == undefined ? false : options.centeredX;
        let centeredY: boolean = options.centeredY == undefined ? false : options.centeredY;
        
        Globals.getP5().textSize(size);

        let textWidth = Globals.getP5().textWidth(text);
        let textHeight = (Globals.getP5().textAscent() * 0.8) + (Globals.getP5().textDescent() * 0.8);

        let width = textWidth + (padding * 2);
        let height = textHeight + (padding * 2);
        
        let rectPosition = UI.position.copy().add(width / 2, height / 2).add(offset).sub(centeredX ? width / 2 : 0, centeredY ? height : 0);
        let textPosition = UI.position.copy().add(offset).add(padding, padding + textHeight).sub(centeredX ? width / 2 : 0, centeredY ? height : 0);
        
        Canvas.rect({ position: rectPosition, width, height, cornerRadius: 10 }, { fill: backgroundColor, alpha: 150 });
        Canvas.text({ position: textPosition, text, size }, { fill: color });
    }
}