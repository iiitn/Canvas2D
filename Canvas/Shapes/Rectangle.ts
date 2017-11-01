import {IDimension, Shape} from './';
import {Point} from '../Point';

export class Rectangle extends Shape {
	private height: number;
	private width: number;
	private color: string;

	/**
	 * Initialize Rectangle object with height, width and color.
	 * @param width 
	 * @param height 
	 * @param color 
	 */
	constructor(width: number, height: number, color: string) {
		super();
		this.width = width;
		this.height = height;
		this.color = color;
		// Set default position.
		this.setPosition(0, 0);
	}

	/**
	 * Renders the object on canvas context.
	 * @param context Canvas context object.
	 * @param baseUnit Canvas offset unit.
	 */
	render(context: CanvasRenderingContext2D, baseUnit: number) {
		// Move object if required.
		this.moveIfNecessary(baseUnit);
		context.beginPath();
		context.shadowBlur=10;
		context.shadowColor=this.color;
		context.fillStyle = this.color;
		context.fillRect(this.curPosition.x, this.curPosition.y, this.width, this.height);
		context.fill();
		context.closePath();
		return this;
	}

	/**
	 * Get the current dimensions of rectangle.
	 */
	getDimensions(): IDimension {
		return {
			x: this.curPosition.x,
			y: this.curPosition.y,
			width: this.width,
			height: this.height
		};
	}
}