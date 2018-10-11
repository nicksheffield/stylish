module.exports = {
	list: {},
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