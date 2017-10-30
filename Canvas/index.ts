import {Shape} from './Shapes';

export class Canvas {
	public readonly height: number;
	public readonly width: number;

	private baseUnit: number = 10;
	private context: CanvasRenderingContext2D;
	private renderIndefinite: boolean;

	private objects: Shape[] = [];

	/**
	 * Create Canvas.
	 * @param elem valid DOM canvas element.
	 * @param renderIndefinite set to false, if fine grained control
	 * of operations is necessary between Canvas renders. Set
	 * to true otherwise. Defaults false.
	 */
	constructor(elem: HTMLCanvasElement, renderIndefinite = false) {
		this.width = elem.width?elem.width: 500;
		this.height = elem.height?elem.height:400;
		this.renderIndefinite = renderIndefinite;

		let context = elem.getContext("2d");
		if (context) {
			this.context = context;
		}
		else {
			console.error("Couldn't create context to Canvas Element : ", elem);
		}
		this.render = this.render.bind(this);

		// Render if fine control over operations is not necessary.
		if (this.renderIndefinite) {
			this.render();
		}
	}

	/**
	 * Adds a shape object to Canvas.
	 * @param obj valid Shape object.
	 */
	addObject(obj: Shape) {
		this.objects.push(obj);
	}

	/**
	 * Remove shape obj from current Canvas.
	 * @param obj Object to be removed.
	 */
	removeObject(obj: Shape) {
		this.objects = this.objects.filter((o)=>{
			if (o==obj)
				return false;
			return true;
		});
	}

	/**
	 * Renders canvas iterating through all the objects.
	 */
	render() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.objects.map((shape)=>{
			shape.render(this.context, this.baseUnit);
		});
		this.context.stroke();
		this.context.fill();
		if (this.renderIndefinite) {
			requestAnimationFrame(this.render);
		}
	}
}