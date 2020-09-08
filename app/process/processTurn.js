const { getNeighbors } = require("../utils/getNeighbors")
const { isPathCrossingLine } = require("../utils/isPathCrossingLine")
const { isPointUsed } = require("../utils/isPointUsed")

exports.processTurn = (newLine, client) => {
	global.validStartPoints = this.getNewStartPoints()
	if (global.validStartPoints.length === 0) {
		client.send(
			`{"id": ${global.id}, "msg" : "GAME_OVER", "body": {"newLine": ${JSON.stringify(
				newLine
			)}, "heading": "GAME OVER!!!!!!!!!!!", "message": "${global.playerName} WINS THE SHIP."}}`
		)
	} else {
		client.send(
			`{"id": ${global.id}, "msg" : "VALID_END_NODE", "body": {"newLine": ${JSON.stringify(
				newLine
			)}, "heading": "${global.playerName}", "message": "${global.playerName}'s move."}}`
		)
	}
}

exports.getNewStartPoints = () => {
	let newStartPoints = global.validStartPoints
	if (this.hasNextMove(global.endPoint)) {
		newStartPoints.push(global.endPoint)
	}
	if (global.isFirstMove) {
		newStartPoints.push(global.startPoint)
	} else {
		newStartPoints = newStartPoints.filter(
			(point) => !(point.x === global.startPoint.x && point.y === global.startPoint.y)
		)
	}

	for (const checkedPoint of newStartPoints) {
		if (!this.hasNextMove(checkedPoint)) {
			newStartPoints = newStartPoints.filter(
				(point) => !(point.x === checkedPoint.x && point.y === checkedPoint.y)
			)
		}
	}

	return newStartPoints
}

exports.hasNextMove = (point) => {
	let neighbors = getNeighbors(point)
	let isValidNextPoint = false
	for (const neighbor in neighbors) {
		if (
			neighbors[neighbor].x < 0 ||
			neighbors[neighbor].y < 0 ||
			neighbors[neighbor].x === global.boardWidth ||
			neighbors[neighbor].y === global.boardHeight
		) {
			continue
		}

		if (isPointUsed(neighbors[neighbor])) {
			continue
		}
		if (isPathCrossingLine(point, neighbor)) {
			continue
		}

		isValidNextPoint = true
		return isValidNextPoint
	}
	return isValidNextPoint
}
