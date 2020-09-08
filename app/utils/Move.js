class Move {
	constructor() {}

	static left(point) {
		let newPoint = point - 1
		return newPoint
	}
	static right(point) {
		let newPoint = point + 1
		return newPoint
	}

	static up(point) {
		let newPoint = point - 1
		return newPoint
	}

	static down(point) {
		let newPoint = point + 1
		return newPoint
	}
}

module.exports = Move
