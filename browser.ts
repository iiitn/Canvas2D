import {Canvas} from './Canvas';
import {Rectangle, Circle, Shape} from './Canvas/Shapes';

// YOUR CODE GOES HERE...
let canvas = new Canvas(document.getElementById("canvas") as HTMLCanvasElement, true);


let rect: Shape = new Rectangle(10, 10, "green").setPosition(100, 100);
canvas.addObject(rect);

let circle = new Circle(10, "red").setPosition(0, 0);
canvas.addObject(circle);
function move(o: any, speed: number)
{
	o.moveTo(Math.random()*canvas.width, Math.random()*canvas.height, speed, ()=>{
		move(o, speed);
	});
}
move(circle, 1);
move(rect, 2);

let pause = document.getElementById("pause") as HTMLButtonElement;
pause.addEventListener("click", ()=>{
	if (canvas.isPaused) {
		canvas.resume();
		pause.innerHTML="Pause";
	}
	else {
		canvas.pause();
		pause.innerHTML = "Resume";
	}
});

