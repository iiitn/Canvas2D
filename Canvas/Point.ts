import Victor = require('victor');

(Victor.prototype as any).interpolate = function(a: Victor, unit: number){
	let self: Victor = this;
	let d = self.distance(a)
	if (d<=(unit+1)) {
		self.copy(a);
		return self;
	}
	let ix = (unit/d)*(a.x-self.x);
	let iy = (unit/d)*(a.y-self.y);
	console.log(ix, iy);
	self.add(new Victor(ix, iy));
	return this;
}

export class Point extends Victor {}