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
	};

	abstract render(context: CanvasRenderingContext2D, baseUnit: number): void;
	abstract moveTo(x: number, y: number, speed?: number): void;
	abstract getDimensions(): IDimension;
}

export {Rectangle} from './Rectangle';
export {Circle} from './Circle';