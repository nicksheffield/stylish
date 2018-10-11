const styles = require('./src/styles')
const colors = require('./src/colors')
const enums = require('./src/enums')
const resolve = require('./src/resolve')
const createStylishComponent = require('./src/createStylishComponent')

module.exports = {
	resolve,
	styles,
	colors,
	enums,
	createStylishComponent,
	addStyle: (...args) => styles.add(...args),
	addEnum: (...args) => enums.add(...args),
	addColor: (...args) => colors.add(...args),
}
