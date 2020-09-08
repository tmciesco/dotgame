const { isValidEndPoint } = require("../validation/endPoint")
const { determinePlayer } = require("../utils/determinePlayer")
const { processTurn } = require("./processTurn")

exports.processEndPointRequest = (req, client) => {
	global.endPoint = { x: req.body.x, y: req.body.y }

	if (isValidEndPoint(global.startPoint, global.endPoint)) {
		global.isPlayerOneTurn = !global.isPlayerOneTurn
		determinePlayer(global.isPlayerOneTurn)
		let newLine = {
			start: {
				x: global.startPoint.x,
				y: global.startPoint.y,
			},
			end: {
				x: global.endPoint.x,
				y: global.endPoint.y,
			},
		}
		global.usedPoints.push(global.endPoint, ...global.pointsOnCurrentPath)
		global.createdLines.push(newLine)
		if (global.isFirstMove) {
			global.usedPoints.push(global.startPoint)
		}
		processTurn(newLine, client)
	} else {
		client.send(
			`{"id": ${global.id}, "msg" : "INVALID_END_NODE", "body": {"newLine": null, "heading": "${global.playerName}", "message": "The point you selected is not a valid end point."}}`
		)
	}
	global.startPoint = null
	global.endPoint = null
	global.pathDirection = ""
	global.pointsOnCurrentPath = []
	global.isStartPointSet = false
	global.id++
	global.isFirstMove = false
}
