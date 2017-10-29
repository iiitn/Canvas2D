let elem = document.getElementById("canvas") as HTMLCanvasElement;

let canvas_width = 500;
let canvas_height = 400;
elem.width = canvas_width;
elem.height = canvas_height;

let canvas = elem.getContext("2d") as CanvasRenderingContext2D;

// Draw grids.
canvas.beginPath();
canvas.strokeStyle = "lightgrey";
canvas.lineWidth = 1;
canvas.lineCap = 'round';
canvas.shadowColor = "none";

for (let i=0; i<=canvas_width/100; i++) {
	canvas.moveTo(i*100, 0);
	canvas.lineTo(i*100, canvas_height);
	canvas.stroke();
}
for (let i=0; i<=canvas_height/100; i++) {
	canvas.moveTo(0, i*100);
	canvas.lineTo(canvas_width, i*100);
	canvas.stroke();
}
canvas.closePath();
// END DRAWING GRIDS.


canvas.beginPath();
canvas.strokeStyle = "green";
canvas.lineWidth = 2;
canvas.lineCap = 'round';
canvas.shadowColor = "green";
canvas.shadowBlur = 0;
canvas.shadowOffsetX = 0
canvas.shadowOffsetY = 0;

type IExecFunction = (done: ()=>void)=>void;
class Execution {
	private static list: IExecFunction[] = [];
	private static done: boolean = true;

	private static callFunc(func: IExecFunction) {
		console.log("Called Function");
		this.done = false;
		func(()=>{
			this.done = true;
			this.dequeue();
		});	
	}
	private static dequeue() {
		console.log("Dequed", this.list);
		if (this.list.length==0) {
			return;
		}
		let ref = this.list[0];
		this.list.splice(0, 1);
		this.callFunc(ref);
	}
	static queue(func: (done: ()=>void)=>void) {
		console.log("Queed", this.list);
		if (this.done) {
			this.callFunc(func);
		}
		else {
			this.list.push(func);
		}
	}
}


// Canvas API for users.
let g_x = 0, g_y = 0;
export let Canvas = {
	moveTo(x: number, y: number) {
		Execution.queue((done)=>{
			g_x = x;
			g_y = y;
			canvas.moveTo(x, y);
			done();
		})
	},
	lineTo(x: number, y: number) {
		let move_unit = 10;
		Execution.queue((done)=>{
			// Interpolate logic goes here...
			let d = Math.sqrt(Math.pow(g_x-x, 2) + Math.pow(g_y-y, 2));
			let interpolateX = (move_unit/d)*(x-g_x);
			let interpolateY = (move_unit/d)*(y-g_y);
			let nextX = g_x, nextY = g_y;
			let interval = setInterval(()=>{
				if (Math.abs(nextX-x)<=move_unit && Math.abs(nextY-y)<=move_unit) {
					nextX = x;
					nextY = y;
				}
				else {
					nextX += interpolateX;
					nextY += interpolateY;
				}
				canvas.lineTo(nextX, nextY);
				canvas.stroke();
				if (x==nextX && y==nextY){
					g_x = x, g_y = y;
					clearInterval(interval);
					(interval as any) = null;
					done();
				}
			}, 10);
		});
	}
};