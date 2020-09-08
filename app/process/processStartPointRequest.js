const { isValidStartPoint } = require("../validation/startPoint")

exports.processStartPointRequest = (req, client) => {
	global.startPoint = { x: req.body.x, y: req.body.y }
	if (global.isFirstMove) {
		global.isStartPointSet = true
		client.send(
			`{"id": ${global.id}, "msg" : "VALID_START_NODE", "body": {"newLine": null, "heading": "${global.playerName}", "message": "Select a second point to complete the line."}}`
		)
	} else if (isValidStartPoint(startPoint)) {
		global.isStartPointSet = true
		client.send(
			`{"id": ${global.id}, "msg" : "VALID_START_NODE", "body": {"newLine": null, "heading": "${global.playerName}", "message": "Select a second point to complete the line."}}`
		)
	} else {
		client.send(
			`{"id": ${global.id}, "msg" : "INVALID_START_NODE", "body": {"newLine": null, "heading": "${global.playerName}", "message": "The point you selected is not a valid starting point!"}}`
		)
	}
	global.id++
}
