import { Vector } from "p5";
import CellManager from "./CellManager";
import { Globals } from "./Globals";
import Particle from "./Particle";
import WallManager from "./WallManager";

export default class GameManager
{
    private static readonly WORLD_SIZE: number = 6000;
    private static readonly NUMBER_SIDES: number = 10;
    private static readonly CELL_AMOUNT: number = 150;

    private static mousePosition: Vector;
    private static PARTICLE_POOL: Particle[] = [];

    public static generateWorld()
    {
        WallManager.generate(GameManager.NUMBER_SIDES, GameManager.WORLD_SIZE);
        CellManager.generate(GameManager.NUMBER_SIDES, GameManager.WORLD_SIZE, this.CELL_AMOUNT);
    }

    public static update()
    {
        const mx: number = (Globals.getP5().mouseX - Globals.getScreenSize().width / 2) + Globals.getPlayer().getX();
        const my: number = (Globals.getP5().mouseY - Globals.getScreenSize().height / 2) + Globals.getPlayer().getY();
        GameManager.mousePosition = Globals.getP5().createVector(mx, my);
        
        this.PARTICLE_POOL.map((p) =>
        {
            if(p.getShouldDestroy())
            {
                let index = this.PARTICLE_POOL.findIndex((pi) => pi === p);
                this.PARTICLE_POOL.splice(index, 1);
            }
        });
    }

    public static draw()
    {
        this.PARTICLE_POOL.map((p) => p.update());

        this.PARTICLE_POOL.map((p) => p.draw());
        WallManager.draw();
        CellManager.draw();
    }

    public static getMouseX(): number
    {
        return GameManager.mousePosition.x;
    }

    public static getMouseY(): number
    {
        return GameManager.mousePosition.y;
    }

    public static addParticle(particle: Particle)
    {
        GameManager.PARTICLE_POOL.push(particle);
    }
}