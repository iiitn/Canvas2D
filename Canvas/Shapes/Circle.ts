import {IDimension, Shape} from './';
import {Point} from '../Point';

export class Circle extends Shape {
	private radius: number;
	private color: string;
	private shadowBlur: number;

	/**
	 * Initialize Circle object with height, width and color.
	 * @param width 
	 * @param height 
	 * @param color 
	 */
	constructor(radius: number, color: string, shadowBlur=10) {
		super();
		this.radius = radius;
		this.color = color;
		this.shadowBlur = shadowBlur;
		// Set default position.
		this.setPosition(radius, radius);
	}

	/**
	 * Sets the position of Circle.
	 * @param x 
	 * @param y 
	 */
	setPosition(x: number, y: number) {
		this.curPosition = new Point(x, y);
		this._move = {
			position: this.curPosition.clone(),
			unit: 1
		};
		return this;
	}

	/**
	 * Renders the object on canvas context.
	 * @param context Canvas context object.
	 * @param baseUnit Canvas offset unit.
	 */
	render(context: CanvasRenderingContext2D, baseUnit: number) {
		// Move object if required.
		if (!this.curPosition.isEqualTo(this._move.position)) {
			let unit = baseUnit*this._move.unit;
			if (unit==0) {
				// Move instantly.
				this.curPosition.copy(this._move.position);
				this._move.callback && this._move.callback();
			}
			else {
				// Interpolate Movement.
				(this.curPosition as any).interpolate(this._move.position, unit);
				if (this.curPosition.isEqualTo(this._move.position)) {
					this._move.callback && this._move.callback();
				}
			}
		}
		context.beginPath();
		context.shadowBlur=this.shadowBlur;
		context.shadowColor=this.color;
		context.fillStyle = this.color;
		context.arc(this.curPosition.x, this.curPosition.y, this.radius, 0, Math.PI*2);
		context.closePath();
		return this;
	}

	/**
	 * Move Circle to new position.
	 * @param x 
	 * @param y 
	 * @param unit 0 to move instantly or specify a number to animate.
	 * @param onFinish Callback function to call after movement is complete.
	 */
	moveTo(x: number, y: number, unit = 1, onFinish?: (from: Point)=>void) {
		this._move = {
			position: new Point(x, y),
			unit: Math.abs(unit),
			callback: onFinish?()=>{
				onFinish(this.curPosition.clone());
			}:undefined
		};
		return this;
	}

	/**
	 * Get the current dimensions of Circle.
	 */
	getDimensions(): IDimension {
		return {
			x: this.curPosition.x,
			y: this.curPosition.y,
			width: this.radius*2,
			height: this.radius*2
		};
	}
}