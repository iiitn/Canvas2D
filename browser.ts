import {Canvas} from './Canvas';
import {Rectangle} from './Canvas/Shapes';

// YOUR CODE GOES HERE...
let canvas = new Canvas(document.getElementById("canvas") as HTMLCanvasElement, true);

setInterval(()=>{
	let x = Math.random()*canvas.width;
	let y = Math.random()*canvas.height;
	let obj = new Rectangle(10, 10, "green").setPosition(x, y);
	canvas.addObject(obj);
	obj.moveTo(Math.random()*canvas.width, Math.random()*canvas.height, 1);
}, 10);