module.exports = {
	list: {
		'col': 'fd:column',
		'col-r': 'fd:column-reverse',
		'row': 'fd:row',
		'row-r': 'fd:row-reverse',
		'bold': 'fw:bold',
		'italic': 'fs:italic',
		'abs': 'pos:absolute',
		'rel': 'pos:relative',
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