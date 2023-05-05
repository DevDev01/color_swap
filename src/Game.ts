import P5, { Vector } from 'p5';
import { Globals } from './Globals';
import { Canvas } from './Canvas';
import CellManager from './CellManager';
import Wall from './Wall';
import UI from './UI';

const Game = (p5: P5) =>
{
    let walls: Wall[] = [];

    p5.preload = () =>
    {
        Globals.initilize(p5, {width: window.innerWidth, height: window.innerHeight});
    }

    p5.setup = () =>
    {
        p5.createCanvas(Globals.getScreenSize().width, Globals.getScreenSize().height).parent("#root");  
        p5.rectMode(p5.CENTER);

        CellManager.generate(250);

        walls.push(new Wall(p5.createVector(0, Globals.WORLD_SIZE), Globals.WORLD_SIZE * 2, 10));
        walls.push(new Wall(p5.createVector(0, -Globals.WORLD_SIZE), Globals.WORLD_SIZE * 2, 10));
        walls.push(new Wall(p5.createVector(Globals.WORLD_SIZE, 0), 10, Globals.WORLD_SIZE * 2));
        walls.push(new Wall(p5.createVector(-Globals.WORLD_SIZE, 0), 10, Globals.WORLD_SIZE * 2));
    }

    p5.draw = () =>
    {
        Canvas.background("#323232");
        Canvas.translate(p5.createVector(Globals.getScreenSize().width / 2 - Globals.getPlayer().getX(), Globals.getScreenSize().height / 2 - Globals.getPlayer().getY()));

        const mx: number = (p5.mouseX - Globals.getScreenSize().width / 2) + Globals.getPlayer().getX();
        const my: number = (p5.mouseY - Globals.getScreenSize().height / 2) + Globals.getPlayer().getY();
        const mousePosition: Vector = p5.createVector(mx, my);

        Canvas.circle({ x: 0, y: 0, radius: 5 }, { fill: "#000000" });

        //Update
        if(p5.mouseButton == p5.LEFT && p5.mouseIsPressed) Globals.getPlayer().setTarget(mousePosition.copy());
        Globals.getPlayer().move();

        Globals.getPlayer().setTimerProgress(Globals.getPlayerTimerTime());

        UI.attach(Globals.getPlayer().getPosition().copy());

        //Draw
        walls.map((w) => w.draw());

        Canvas.customCursor(mousePosition.copy(), 10, (p5.mouseButton == p5.LEFT && p5.mouseIsPressed));
        Globals.getPlayer().draw();

        CellManager.draw();

        UI.label({ x: -Globals.getScreenSize().width / 2 + 20, y: -Globals.getScreenSize().height / 2 + 20, text: "FPS: " + Globals.getP5().frameRate().toFixed(0), size: 15, padding: 10 });
        UI.label({ x: 0, y: -Globals.getScreenSize().height / 2 + 20, text: "Score: " + Globals.getPlayer().getScore(), size: 35, padding: 10 });
    }

    p5.windowResized = () => Globals.resizeScreen({width: window.innerWidth, height: window.innerHeight});
}

export default Game;