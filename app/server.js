const { processEndPointRequest } = require("./process/processEndPointRequest")
const { processStartPointRequest } = require("./process/processStartPointRequest")

const serverPort = 8081,
	http = require("http"),
	express = require("express"),
	app = express(),
	server = http.createServer(app),
	WebSocket = require("ws"),
	websocketServer = new WebSocket.Server({ server })

websocketServer.on("connection", (webSocketClient) => {
	// NOTE: State variables are defined globally for the purposes of running the demo. In a full-featured version I would use something like Redis to handle game states and write wins/losses to a db.
	global.boardHeight = 4
	global.boardWidth = 4
	global.startPoint = null
	global.endPoint = null
	global.pathDirection = ""
	global.isFirstMove = true
	global.validStartPoints = []
	global.usedPoints = []
	global.pointsOnCurrentPath = []
	global.createdLines = []
	global.isStartPointSet = false
	global.isPlayerOneTurn = true
	global.playerName = "Player One"
	webSocketClient.send(
		`{"id": 1, "msg" : "INITIALIZE", "body": {"newLine": null, "heading": "${global.playerName}", "message": "Awaiting Player 1's Move"}}`
	)
	global.id = 2
	webSocketClient.on("message", (message) => {
		const req = JSON.parse(message)
		websocketServer.clients.forEach((client) => {
			if (req.msg === "NODE_CLICKED" && global.isStartPointSet) {
				processEndPointRequest(req, client)
			} else if (req.msg === "NODE_CLICKED" && !global.isStartPointSet) {
				processStartPointRequest(req, client)
			}
		})
	})
})

server.listen(serverPort, () => {
	console.log(`Websocket server started on port ` + serverPort)
})
