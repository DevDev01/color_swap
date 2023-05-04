import P5, { Vector } from 'p5';
import Globals from './Globals';
import Canvas from './Canvas';
import Cell from './Cell';

const Game = (p5: P5) =>
{
    p5.preload = () =>
    {
        Globals.initilize(p5, {width: window.innerWidth, height: window.innerHeight});
    }

    p5.setup = () =>
    {
        p5.createCanvas(Globals.getScreenSize().width, Globals.getScreenSize().height).parent("#root");  
        p5.rectMode(p5.CENTER);

        Globals.generateCells(200);
        
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
        Globals.getPlayer().update();
        
        Globals.getCells().map((c) => c.update());

        if(p5.mouseButton == p5.LEFT && p5.mouseIsPressed) Globals.getPlayer().setTarget(mousePosition.copy());
        Globals.getPlayer().move();

        //Draw
        Canvas.customCursor(mousePosition.copy(), 10, (p5.mouseButton == p5.LEFT && p5.mouseIsPressed));
        Globals.getPlayer().draw();

        Globals.getCells().map((c) => c.draw());
    }

    p5.windowResized = () => Globals.resizeScreen({width: window.innerWidth, height: window.innerHeight});
}

export default Game;