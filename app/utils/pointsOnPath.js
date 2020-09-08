const Move = require("./Move")
const { getDistance } = require("./pathDirection")

// only gets the points in between start and end, not the end point
exports.getPointsOnCurrentPath = (startPoint, endPoint, pathDirection) => {
	let x, y
	switch (pathDirection) {
		case "leftup":
			for (
				x = Move.left(startPoint.x), y = Move.up(startPoint.y);
				x > endPoint.x && y > endPoint.y;
				x--, y--
			) {
				pointsOnCurrentPath.push({ x: x, y: y })
			}
			break
		case "up":
			for (y = Move.up(startPoint.y); y > endPoint.y; y--) {
				pointsOnCurrentPath.push({ x: startPoint.x, y: y })
			}
			break
		case "rightup":
			for (
				x = Move.right(startPoint.x), y = Move.up(startPoint.y);
				x < endPoint.x && y > endPoint.y;
				x++, y--
			) {
				pointsOnCurrentPath.push({ x: x, y: y })
			}
			break
		case "right":
			for (x = Move.right(startPoint.x); x < endPoint.x; x++) {
				pointsOnCurrentPath.push({ x: x, y: startPoint.y })
			}
			break
		case "rightdown":
			for (
				x = Move.right(startPoint.x), y = Move.down(startPoint.y);
				x < endPoint.x && y < endPoint.y;
				x++, y++
			) {
				pointsOnCurrentPath.push({ x: x, y: y })
			}
			break
		case "down":
			for (y = Move.down(startPoint.y); y < endPoint.y; y++) {
				pointsOnCurrentPath.push({ x: startPoint.x, y: y })
			}
			break
		case "leftdown":
			for (
				x = Move.left(startPoint.x), y = Move.down(startPoint.y);
				x > endPoint.x && y < endPoint.y;
				x--, y++
			) {
				pointsOnCurrentPath.push({ x: x, y: y })
			}
			break
		case "left":
			for (x = Move.left(startPoint.x); x > endPoint.x; x--) {
				pointsOnCurrentPath.push({ x: x, y: startPoint.y })
			}
			break
		default:
	}
	return pointsOnCurrentPath
}
