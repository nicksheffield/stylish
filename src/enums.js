module.exports = {
	list: {
		'no': 'no-wrap',
		'start': 'flex-start',
		'end': 'flex-end',
		'between': 'space-between',
		'around': 'space-around',
		'evenly': 'space-evenly',
		'1u': 6 * 1,
		'2u': 6 * 2,
		'3u': 6 * 3,
		'4u': 6 * 4,
		'5u': 6 * 5,
		'6u': 6 * 6,
		'7u': 6 * 7,
	},
	add: function(x, v) {
		if (typeof x === 'object') {
			Object.entries(x).forEach(([key, val]) => {
				this.list[key] = val
			})
		} else {
			this.list[x] = v
		}
	},
	get: function(x) { return this.list[x] }
}