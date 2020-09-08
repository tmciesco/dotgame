exports.isValidStartPoint = (point) => {
	let i
	for (i = 0; i < global.validStartPoints.length; i++) {
		if (global.validStartPoints[i].x === point.x && global.validStartPoints[i].y === point.y) {
			return true
		}
	}
	return false
}
