const Move = require("./Move")
const { isPointUsed } = require("./isPointUsed")

exports.isPathCrossingLine = (currentPoint, direction) => {
	let sharedNeighbors = []

	switch (direction) {
		case "leftup":
			sharedNeighbors.push({ x: Move.left(currentPoint.x), y: currentPoint.y })
			sharedNeighbors.push({ x: currentPoint.x, y: Move.up(currentPoint.y) })
			break
		case "up":
			sharedNeighbors.push({ x: currentPoint.x, y: Move.up(currentPoint.y) })
			break
		case "rightup":
			sharedNeighbors.push({ x: Move.right(currentPoint.x), y: currentPoint.y })
			sharedNeighbors.push({ x: currentPoint.x, y: Move.up(currentPoint.y) })
			break
		case "right":
			sharedNeighbors.push({ x: Move.right(currentPoint.x), y: currentPoint.y })
			break
		case "rightdown":
			sharedNeighbors.push({ x: Move.right(currentPoint.x), y: currentPoint.y })
			sharedNeighbors.push({ x: currentPoint.x, y: Move.down(currentPoint.y) })
			break
		case "down":
			sharedNeighbors.push({ x: currentPoint.x, y: Move.down(currentPoint.y) })
			break
		case "leftdown":
			sharedNeighbors.push({ x: Move.left(currentPoint.x), y: currentPoint.y })
			sharedNeighbors.push({ x: currentPoint.x, y: Move.down(currentPoint.y) })
			break
		case "left":
			sharedNeighbors.push({ x: Move.left(currentPoint.x), y: currentPoint.y })
			break
		default:
			return true
	}

	let bothPointsUsed
	let pointToCheck

	if (isPointUsed(sharedNeighbors[0])) {
		if (sharedNeighbors.length === 1) {
			return true
		} else if (isPointUsed(sharedNeighbors[1])) {
			bothPointsUsed = true
		}
	}
	// check if a created line exists between the two maybe
	if (bothPointsUsed) {
		for (i = 0; i < global.createdLines.length; i++) {
			if (
				(sharedNeighbors[0].x === global.createdLines[i].start.x &&
					sharedNeighbors[0].y === global.createdLines[i].start.y) ||
				(sharedNeighbors[0].x === global.createdLines[i].end.x &&
					sharedNeighbors[0].y === global.createdLines[i].end.y)
			) {
				pointToCheck =
					sharedNeighbors[0].x === global.createdLines[i].start.x
						? "checkEndForMatch"
						: "checkStartForMatch"
			} else {
				continue
			}

			if (pointToCheck === "checkEndForMatch") {
				if (
					sharedNeighbors[1].x === global.createdLines[i].end.x &&
					sharedNeighbors[1].y === global.createdLines[i].end.y
				) {
					return true
				}
			} else if (pointToCheck === "checkStartForMatch") {
				if (
					sharedNeighbors[1].x === global.createdLines[i].start.x &&
					sharedNeighbors[1].y === global.createdLines[i].start.y
				) {
					return true
				}
			}
		}
	}

	return false
}
