const { getPointsOnCurrentPath } = require("../utils/pointsOnPath")
const { getPathDirection } = require("../utils/pathDirection")
const { isPathCrossingLine } = require("../utils/isPathCrossingLine")

exports.isValidPath = (startPoint, endPoint) => {
	if (startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
		return false
	}

	let pathDirection = getPathDirection(startPoint, endPoint)
	let pointsOnCurrentPath = getPointsOnCurrentPath(startPoint, endPoint, pathDirection)

	let i, j
	for (i = 0; i < pointsOnCurrentPath.length; i++) {
		for (j = 0; j < global.usedPoints.length; j++) {
			if (
				pointsOnCurrentPath[i].x === global.usedPoints[j].x &&
				pointsOnCurrentPath[i].y === global.usedPoints[j].y
			) {
				return false
			}
		}
		let currentPoint = { x: pointsOnCurrentPath[i].x, y: pointsOnCurrentPath[i].y }

		if (isPathCrossingLine(currentPoint, pathDirection)) {
			return false
		}
	}

	global.pathDirection = pathDirection
	global.pointsOnCurrentPath = pointsOnCurrentPath

	return true
}
