module.exports = {
	list: {},
	add: function(x, v) { this.list[x] = v },
	get: function(x) { return this.list[x] }
}