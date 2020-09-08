const { isValidPath } = require("./path")

exports.isValidEndPoint = (startPoint, endPoint) => {
	for (i = 0; i < global.usedPoints.length; i++) {
		if (endPoint.x === global.usedPoints[i].x && endPoint.y === global.usedPoints[i].y) {
			return false
		}
	}
	return isValidPath(startPoint, endPoint)
}
