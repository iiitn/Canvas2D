import {Canvas} from './Canvas';
import {Rectangle, Circle, Shape} from './Canvas/Shapes';

// YOUR CODE GOES HERE...
let canvas = new Canvas(document.getElementById("canvas") as HTMLCanvasElement, true);

let obj: Shape = new Rectangle(10, 10, "green").setPosition(0, 0);
canvas.addObject(obj);
obj.moveTo(Math.random()*canvas.width, Math.random()*canvas.height, 1);

obj = new Circle(10, "red").setPosition(0, 0);
canvas.addObject(obj);
obj.moveTo(Math.random()*canvas.width, Math.random()*canvas.height, 1);