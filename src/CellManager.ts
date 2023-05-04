import Cell from "./Cell";

export default class CellManager
{
    private static cells: Cell[] = [];

    public static generate(amount: number)
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