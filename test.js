const stylish = require('./index').default
const stylishColors = require('./index').colors
const assert = require('assert').strict

stylishColors.add('primary', '#DD0000')


const i = stylish('bold italic fz:15 w:100% h:50 txt:red bg:primary jc:between pt:2u')
const o = {
	backgroundColor: '#DD0000',
	fontWeight: 'bold',
	fontSize: 15,
	height: 50,
	fontStyle: 'italic',
	justifyContent: 'space-between',
	color: 'red',
	width: '100%',
	paddingTop: 12
}

try {
	assert.deepStrictEqual(i, o)
	console.log('pass', i)
} catch(e) {
	console.log('fail', e)
}