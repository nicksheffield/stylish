const React = require('react')
const StyleSheet = require('react-native').StyleSheet
const flatten = require('ramda/src/flatten')
const transformers = require('./transformers')

const cache = {}

const resolve = (str) => {
	const sig = str.split(' ').sort().join(' ')

	if (cache[sig]) return cache[sig]

	const styles = sig
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

	cache[sig] = StyleSheet.create({ styles }).styles

	return cache[sig]
}

const convert = (...args) => {
	let list = flatten(args)
		.map(item => typeof item === 'string' ? resolve(item) : item)
		.reduce((acc, obj) => ({...acc, ...obj}), {})
	
	return list
}

export default convert

export const createStylishComponent = (Component) => (props) => <Component {...props} style={convert(props.style)} />
