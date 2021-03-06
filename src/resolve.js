const transformers = require('./transformers')
const styles = require('./styles')


const flatten = (arr) => arr.reduce((acc, item) => {
	return [...acc, ...(item instanceof Array ? flatten(item) : [item])]
}, [])


const convert = (str) => str
	.split(' ')
	.map(item => item.split(':'))
	.map(([prop, value]) => {
		if (transformers[prop]) return transformers[prop](value)
		if (styles.get(prop)) return resolve(styles.get(prop))
		
		console.warn(`Stylish: Invalid style key "${prop}"`)
		return null
	})
	.reduce((acc, obj) => ({...acc, ...obj}), {})


const resolve = (...args) => flatten(args)
	.filter(item => item)
	.map(item => typeof item === 'string' ? convert(item) : item)
	.reduce((acc, obj) => ({...acc, ...obj}), {})


module.exports = resolve
