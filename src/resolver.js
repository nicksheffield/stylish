const React = require('react')
const flatten = require('ramda/src/flatten')
const transformers = require('./transformers')
const colors = require('./colors')
const enums = require('./enums')
const styles = require('./styles')


const resolve = (str) => str
	.split(' ')
	.map(item => item.split(':'))
	.map(([prop, value]) => {
		if (transformers[prop]) return transformers[prop](value)
		if (styles.get(prop)) return convert(styles.get(prop))
		
		console.warn(`Stylish: Invalid style key "${prop}"`)
		return {}
	})
	.reduce((acc, obj) => ({...acc, ...obj}), {})


const convert = (...args) => flatten(args)
	.map(item => typeof item === 'string' ? resolve(item) : item)
	.reduce((acc, obj) => ({...acc, ...obj}), {})


module.exports = {
	default: {
		resolve: convert,
		addStyle: (...args) => styles.add(...args),
		addEnum: (...args) => enums.add(...args),
		addColor: (...args) => colors.add(...args),
	},
	resolve: convert,
	styles: styles,
	colors: colors,
	enums: enums,
	createStylishComponent: (Component) => {
		return (props) => {
			return React.createElement(Component, {
				...props,
				style: convert(props.style)
			})
		}
	}
}
