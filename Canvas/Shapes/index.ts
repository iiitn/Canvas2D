import {Point} from '../Point';

export interface IDimension {
	x: number
	y: number
	width: number
	height: number
}

/**
 * Base Class for all types of shapes that can be
 * added to Canvas library.
 */
export abstract class Shape {
	protected curPosition: Point;
	protected _move: {
		position: Point
		unit: number
		callback?: (from?: Point)=>void
	};

	abstract render(context: CanvasRenderingContext2D, baseUnit: number): void;
	abstract moveTo(x: number, y: number, unit?: number, onFinish?: (from: Point)=>void): void;
	abstract getDimensions(): IDimension;

	isOverlap(obj: Shape) {
		let a = this.getDimensions();
		let b = obj.getDimensions();

		// Check if not horizontal side overlap.
		if (a.x>(b.x+b.width) || b.x>(a.x+a.width)) {
			return false;
		}
		if (a.y>(b.y+b.height) || b.y>(a.y+a.height)) {
			return false;
		}
		return true;
	}
}

export {Rectangle} from './Rectangle';
export {Circle} from './Circle';