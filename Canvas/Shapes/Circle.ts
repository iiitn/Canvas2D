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
	 * Renders the object on canvas context.
	 * @param context Canvas context object.
	 * @param baseUnit Canvas movement speed offset unit.
	 */
	render(context: CanvasRenderingContext2D, baseUnit: number) {
		// Move object if required.
		this.moveIfNecessary(baseUnit);
		context.beginPath();
		context.shadowBlur=this.shadowBlur;
		context.shadowColor=this.color;
		context.fillStyle = this.color;
		context.arc(this.curPosition.x, this.curPosition.y, this.radius, 0, Math.PI*2);
		context.fill();
		context.closePath();
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