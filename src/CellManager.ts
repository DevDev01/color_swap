import Cell from "./Cell";

export default class CellManager
{
    private static cells: Cell[] = [];

    public static generateCells(amount: number)
    {
        for(let i = 0; i < amount; i++)
        {
            CellManager.cells.push(new Cell());
        }
    }

    public static getCells()
    {
        return CellManager.cells;
    }

    public static drawCells()
    {
        CellManager.getCells().map((c) => c.draw());
    }
}