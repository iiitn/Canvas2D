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
	abstract getDimensions(): IDimension;

	protected moveIfNecessary(baseUnit: number) {
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
	}

	/**
	 * Sets the position of Shape.
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
	 * Move Shape to new position.
	 * @param x 
	 * @param y 
	 * @param unit 0 to move instantly or specify a number to animate.
	 * @param onFinish Callback function to call after movement is complete.
	 * 
	 * Overwrite this function if modifications required.
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
export {CustomShape} from './CustomShape';