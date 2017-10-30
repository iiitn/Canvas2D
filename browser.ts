import {Canvas} from './Canvas';
import {Rectangle, Circle, Shape} from './Canvas/Shapes';

// YOUR CODE GOES HERE...
let canvas = new Canvas(document.getElementById("canvas") as HTMLCanvasElement, true);

function move(o: any, speed: number)
{
	o.moveTo(Math.random()*canvas.width, Math.random()*canvas.height, speed, ()=>{
		move(o, speed);
	});
}
let circle: Shape = new Circle(10, "red").setPosition(0, 0);
move(circle, 0.5);

for (let i=0; i<40; i++) {
	let rect: Shape = new Rectangle(10, 10, "green").setPosition(0, 0);
	canvas.addObject(rect);
	move(rect, 1);
}
for (let i=0; i<40; i++) {
	let circle: Shape = new Circle(5, "green").setPosition(0, 0);
	canvas.addObject(circle);
	move(circle, 1);
}
canvas.addObject(circle);

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

