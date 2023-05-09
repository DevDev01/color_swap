import P5, { Vector } from 'p5';
import { Globals } from './Globals';
import { Canvas } from './Canvas';
import UI from './UI';
import GameManager from './GameManager';

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
        p5.frameRate(60);

        GameManager.generateWorld();

        for(let i = 0; i < 25; i++) console.log(Globals.randomDirection(Globals.getP5().createVector(), 50));

        //let f = new Function("return { run: function(manager) { manager.generate(100); } }");
        //console.log(f().run(CellManager));
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
        GameManager.update();

        if(p5.mouseButton == p5.LEFT && p5.mouseIsPressed) Globals.getPlayer().setTarget(mousePosition.copy());
        Globals.getPlayer().move();

        Globals.getPlayer().setTimerProgress(Globals.getPlayerTimerTime());

        UI.attach(Globals.getPlayer().getPosition().copy());

        //Draw
        GameManager.draw();

        Canvas.customCursor(mousePosition.copy(), 10, (p5.mouseButton == p5.LEFT && p5.mouseIsPressed));

        Globals.getPlayer().draw();
        let a = p5.radians(90) + Math.atan2(GameManager.getMouseY() - Globals.getPlayer().getY(), GameManager.getMouseX() - Globals.getPlayer().getX())

        Canvas.triangle({ rotation: a, x: Globals.getPlayer().getX(), y: Globals.getPlayer().getY(), length: 50 }, { fill: Globals.getPlayer().getColor(), shade: -0.1 });
        Canvas.circle({ x: Globals.getPlayer().getX(), y: Globals.getPlayer().getY(), radius: 2 }, { fill: "#ffffff" });
        //User Interface
        //Canvas.text({ x: Globals.getPlayer().getX() - Globals.getScreenSize().width / 2, y: Globals.getPlayer().getY(), text: "Created By DevDev" }, { fill: "#ffffff" })


        UI.label({ x: Globals.getScreenSize().width / 2, y: 10, text: "Score: " + Globals.getPlayer().getScore(), size: 35, centeredX: true });
        UI.label({ x: 10, y: 10, text: "FPS: " + Globals.getP5().frameRate().toFixed(0), size: 12 });
        UI.label({ x: 10, y: Globals.getScreenSize().height - 10, text: "Created By DevDev", size: 12, centeredY: true });
    }

    p5.windowResized = () => Globals.resizeScreen({width: window.innerWidth, height: window.innerHeight});
}

export default Game;