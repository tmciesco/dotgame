const Move = require("./Move")

exports.getNeighbors = (point) => {
	let neighbors = {
		leftup: { x: Move.left(point.x), y: Move.up(point.y) },
		up: { x: point.x, y: Move.up(point.y) },
		rightup: { x: Move.right(point.x), y: Move.up(point.y) },
		right: { x: Move.right(point.x), y: point.y },
		rightdown: { x: Move.right(point.x), y: Move.down(point.y) },
		down: { x: point.x, y: Move.down(point.y) },
		leftdown: { x: Move.left(point.x), y: Move.down(point.y) },
		left: { x: Move.left(point.x), y: point.y },
	}

	return neighbors
}
