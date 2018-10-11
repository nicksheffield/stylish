const stylish = require('./index').default
const assert = require('assert').strict


const i = stylish('bold italic fz:15 w:100% h:50')
const o = {
	fontWeight: 'bold',
	fontStyle: 'italic',
	fontSize: 15,
	width: '100%',
	height: 50
}

try {
	assert.deepStrictEqual(i, o)
	console.log('pass')
} catch(e) {
	console.log('fail', e)
}