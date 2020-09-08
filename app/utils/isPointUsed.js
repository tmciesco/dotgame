exports.isPointUsed = (point) => {
	for (i = 0; i < global.usedPoints.length; i++) {
		if (point.x === global.usedPoints[i].x && point.y === global.usedPoints[i].y) {
			return true
		}
	}
	return false
}
