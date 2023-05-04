import P5 from 'p5';
import Globals from './Globals';
import Canvas from './Canvas';

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
    }

    p5.draw = () =>
    {
        Canvas.background("#323232");
        Canvas.translate(p5.createVector(Globals.getScreenSize().width / 2 - Globals.getPlayer().getX(), Globals.getScreenSize().height / 2 - Globals.getPlayer().getY()));

        Globals.getPlayer().update();
        Globals.getPlayer().draw();
    }

    p5.windowResized = () => Globals.resizeScreen({width: window.innerWidth, height: window.innerHeight});
}

export default Game;