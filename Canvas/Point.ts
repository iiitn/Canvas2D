export interface IPoint {
	x: number
	y: number
}

export class Point {
	/**
	 * Calculate distance between two points. 
	 */
	static getDistance(a: IPoint, b: IPoint): number {
		return Math.sqrt(Math.pow(b.x-a.x, 2) + Math.pow(b.y-a.y, 2));
	}

	/**
	 * Get next interpolated point with `unit` distance.
	 * @param unit Interpolate distance.
	 */
	static getInterpolatedPoint(a: IPoint, b: IPoint, unit: number): IPoint {
		let d = this.getDistance(a, b);
		let ix = (unit/d)*(b.x-a.x);
		let iy = (unit/d)*(b.y-a.y);
		return {x: ix, y: iy};
	}
}