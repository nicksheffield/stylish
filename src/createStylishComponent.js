const React = require('react')
const resolve = require('./resolve')


module.exports = (Component) => {
	return React.forwardRef((props, ref) => {
		return React.createElement(Component, {
			...props, ref,
			style: resolve(props.style)
		})
	})
}
