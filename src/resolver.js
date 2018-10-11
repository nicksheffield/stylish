const React = require('react')
const flatten = require('ramda/src/flatten')
const transformers = require('./transformers')
const colors = require('./colors')
const enums = require('./enums')

const cache = {}

const resolve = (str) => {
	const styles = str
		.split(' ')
		.map(item => item.split(':'))
		.map(([prop, value]) => {
			if (!transformers[prop]) {
				console.warn(`Stylish: Invalid style key "${prop}"`)
				return {}
			}
			return transformers[prop](value)
		})
		.reduce((acc, obj) => ({...acc, ...obj}), {})

	return styles
}

const convert = (...args) => {
	let list = flatten(args)
		.map(item => typeof item === 'string' ? resolve(item) : item)
		.reduce((acc, obj) => ({...acc, ...obj}), {})
	
	return list
}

module.exports = {
	default: convert,
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

