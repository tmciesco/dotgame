const { getDistance } = require("./pathDistance")

exports.getPathDirection = (startPoint, endPoint) => {
	let directionX // positive is right, negative is left, 0 is a vert line
	let directionY // positive is down, negative is up, 0 is a horiz line
	let distanceX = getDistance(startPoint.x, endPoint.x)
	let distanceY = getDistance(startPoint.y, endPoint.y)

	if (distanceX === 0) {
		directionX = ""
	} else if (distanceX >= 1) {
		directionX = "right"
	} else {
		directionX = "left"
	}

	if (distanceY === 0) {
		directionY = ""
	} else if (distanceY >= 1) {
		directionY = "down"
	} else {
		directionY = "up"
	}

	let pathDirection = directionX + directionY
	return pathDirection
}
