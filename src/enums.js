module.exports = {
	list: {
		'no': 'no-wrap',
		'start': 'flex-start',
		'end': 'flex-end',
		'between': 'space-between',
		'around': 'space-around',
		'evenly': 'space-evenly',
	},
	add: function(x, v) { this.list[x] = v },
	get: function(x) { return this.list[x] }
}