const stylish = require('./index')
const assert = require('assert').strict

stylish.addColor('primary', '#DD0000')
stylish.addStyle({
	'my-style': 'bb-w:1 bb-c:#eee my-style2',
	'my-style2': 'txt:red bg:primary'
})

// stylish.addStyle('my-style', 'bb-w:1 bb-c:#eee my-style2')
// stylish.addStyle('my-style2', 'txt:red bg:primary')


const i2 = stylish.resolve('my-style mb:-10')
const o2 = {
	borderBottomWidth: 1,
	borderBottomColor: '#eee',
	color: 'red',
	backgroundColor: '#DD0000',
	marginBottom: -10
}

try {
	assert.deepStrictEqual(i2, o2)
	console.log('pass', i2)
} catch(e) {
	console.log('fail', e)
}