import { Globals } from "./Globals";
import Wall from "./Wall";

export default class WallManager
{
    private static walls: Wall[] = [];

    public static generate(n: number, worldSize: number)
    {
        let segments = Globals.polygonSegements(Globals.getP5().createVector(), n, worldSize / 2);

        for(let s = 0; s < segments.length; s++)
        {
            let { x, y, length, angle } = segments[s];

            WallManager.walls.push(new Wall(Globals.getP5().createVector(x, y), length + 4, 10, angle));
        }
    }

    public static getWalls()
    {
        return WallManager.walls;
    }

    public static draw()
    {
        WallManager.getWalls().map((w) => w.draw());
    }
}