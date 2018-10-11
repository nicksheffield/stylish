const React = require('react')
const resolve = require('./resolve')


module.exports = (Component) => {
	return (props) => {
		return React.createElement(Component, {
			...props,
			style: resolve(props.style)
		})
	}
}