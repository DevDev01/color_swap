import { Vector } from "p5";
import Cell from "./Cell";
import { Globals } from "./Globals";

export default class CellManager
{
    private static cells: Cell[] = [];

    public static generate(n: number, worldSize: number, amount: number)
    {
        let innerRadius = (worldSize / 2 * Math.cos(Globals.getP5().radians(180 / n))) - 10;

        for(let i = 0; i < amount; i++)
        {
            let position: Vector = Globals.randomPointCircle(Globals.getP5().createVector(), innerRadius);
            console.log(innerRadius);
            CellManager.cells.push(new Cell({ position }));
        }
    }

    public static getCells()
    {
        return CellManager.cells;
    }

    public static draw()
    {
        CellManager.getCells().map((c) => c.draw());
    }

    public static getByLabel(label: string): Cell | undefined
    {
        return CellManager.getCells().find((c) => c.getLabel() === label);
    }

    public static add(cell: Cell)
    {
        CellManager.cells.push(cell);
    }

    public static remove(cell: Cell)
    {
        CellManager.cells.splice(CellManager.cells.findIndex((c) => c.getLabel() === cell.getLabel()), 1);
    }
}