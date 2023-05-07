import CellManager from "./CellManager";
import Particle from "./Particle";
import WallManager from "./WallManager";

export default class GameManager
{
    private static readonly WORLD_SIZE: number = 6000;
    private static readonly NUMBER_SIDES: number = 100;
    private static readonly CELL_AMOUNT: number = 150;

    private static PARTICLE_POOL: Particle[] = [];

    public static generateWorld()
    {
        WallManager.generate(GameManager.NUMBER_SIDES, GameManager.WORLD_SIZE);
        CellManager.generate(GameManager.NUMBER_SIDES, GameManager.WORLD_SIZE, this.CELL_AMOUNT);
    }

    public static update()
    {
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

    public static addParticle(particle: Particle)
    {
        GameManager.PARTICLE_POOL.push(particle);
    }
}