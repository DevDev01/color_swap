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
        p5.createCanvas(Globals.getScreenSize().width,Globals.getScreenSize().height).parent("#root");  
        p5.rectMode(p5.CENTER);
    }

    p5.draw = () =>
    {
        p5.background(50);
        Canvas.rect({ position: p5.createVector(0, 200), width: 100, height: 100 }, { fill: "#ffffff" });
    }
    
    p5.windowResized = () => Globals.resizeScreen({width: window.innerWidth, height: window.innerHeight});
}

export default Game;