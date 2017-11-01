import {IDimension, Shape} from './';
import {Point} from '../Point';

export interface IPoint {
	x: number
	y: number
}
export class CustomShape extends Shape {
	private color: string;
	private shadowBlur: number;
	private points: IPoint[];

	/**
	 * Initialize Circle object with height, width and color.
	 * @param width 
	 * @param height 
	 * @param color 
	 */
	constructor(points: IPoint[], color: string, shadowBlur=10) {
		super();
		this.color = color;
		this.shadowBlur = shadowBlur;
		this.points = points;
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

		context.save();
		context.translate(this.curPosition.x, this.curPosition.y);
		context.beginPath();
		for (let i of this.points) {
			context.lineTo(i.x, i.y);
		}
		context.closePath();
		context.shadowBlur=this.shadowBlur;
		context.shadowColor=this.color;
		context.fillStyle = this.color;
		context.fill();
		context.restore();
		return this;
	}

	/**
	 * Get the current dimensions of CustomShape.
	 */
	getDimensions(): IDimension {
		return {
			x: this.curPosition.x,
			y: this.curPosition.y,
			width: -1,
			height: -1
		};
	}
}