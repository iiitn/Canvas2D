import {Shape} from './Shapes';

export class Canvas {
	public readonly height: number;
	public readonly width: number;

	private _pause = false;

	private baseUnit: number = 5;
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
	 * Check if object is in bounds of canvas viewport.
	 * @param obj
	 */
	isInViewPort(obj: Shape): boolean {
		let dim = obj.getDimensions();

		// Check if object is horizontally out of bounds.
		if (dim.x>this.width || (dim.x+dim.width)<0) {
			return false;
		}
		// Check if object is vertically out of bounds.
		if (dim.y>this.height || (dim.y+dim.height)<0) {
			return false;
		}
		return true;
	}

	/**
	 * Renders canvas iterating through all the objects.
	 */
	render() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.objects.map((shape)=>{
			shape.render(this.context, this.baseUnit);
		});
		if (this.renderIndefinite && !this._pause) {
			requestAnimationFrame(this.render);
		}
	}

	get isPaused() {
		return this._pause;
	}
	pause() {
		if (this.renderIndefinite) {
			this._pause = true;
		}
		else {
			throw "Canvas is not running in indefinite mode.";
		}
	}
	resume() {
		if (this.renderIndefinite) {
			if (this._pause) {
				this._pause = false;
				requestAnimationFrame(this.render);	
			}
		}
		else {
			throw "Canvas is not running in indefinite mode.";
		}
	}
}