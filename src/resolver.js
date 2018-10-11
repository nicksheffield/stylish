const React = require('react')
const StyleSheet = require('react-native').StyleSheet
const flatten = require('ramda/src/flatten')
const enums = require('./enums')

const colors = []

const unit = (x) => /^[\d\.]+$/.test(x) ? +x : x

/**
 * Not implemented:
 * 
 * "alignContent",
 * "alignSelf",
 * "aspectRatio",
 * "backfaceVisibility",
 * "decomposedMatrix",
 * "direction",
 * "display",
 * "flexBasis",
 * "flexGrow",
 * "flexShrink",
 * "fontStyle",
 * "fontVariant",
 * "includeFontPadding",
 * "overlayColor",
 * "resizeMode",
 * "rotation",
 * "scaleX",
 * "scaleY",
 * "shadowColor",
 * "shadowOffset",
 * "shadowOpacity",
 * "shadowRadius",
 * "textDecorationColor",
 * "textDecorationLine",
 * "textDecorationStyle",
 * "textShadowColor",
 * "textShadowOffset",
 * "textShadowRadius",
 * "tintColor",
 * "transform",
 * "transformMatrix",
 * "translateX",
 * "translateY",
 * "writingDirection",
 */

const properties = {
	'bg':     (x) => ({ backgroundColor: colors[x] || x }),
	'col':    (_) => ({ flexDirection: 'column' }),
	'col-r':  (_) => ({ flexDirection: 'column-reverse' }),
	'row':    (_) => ({ flexDirection: 'row' }),
	'row-r':  (_) => ({ flexDirection: 'row-reverse' }),
	'fw':     (x) => ({ flexWrap: enums.flexWrap[x] }),
	'jc':     (x) => ({ justifyContent: enums.justifyContent[x] }),
	'ai':     (x) => ({ alignItems: enums.alignItems[x] }),
	'as':     (x) => ({ alignSelf: enums.alignItems[x] }),
	'ac':     (x) => ({ alignContent: enums.alignContent[x] }),
	'f':      (x) => ({ flex: +x }),
	'h':      (x) => ({ height: unit(x) }),
	'w':      (x) => ({ width: unit(x) }),
	'max-h':  (x) => ({ maxHeight: unit(x) }),
	'max-w':  (x) => ({ maxWidth: unit(x) }),
	'min-h':  (x) => ({ minHeight: unit(x) }),
	'min-w':  (x) => ({ minWidth: unit(x) }),
	'o':      (x) => ({ opacity: +x }),
	'e':      (x) => ({ elevation: +x }),
	'of':     (x) => ({ overflow: x }),

	'txt':    (x) => ({ color: colors[x] || x }),
	'ff':     (x) => ({ fontFamily: x.replace(/\-/g, ' ') }),
	'fz':     (x) => ({ fontSize: unit(x) }),
	'bold':   (_) => ({ fontWeight: 'bold' }),
	'italic': (_) => ({ fontStyle: 'italic' }),
	'ls':     (x) => ({ letterSpacing: unit(x) }),
	'lh':     (x) => ({ lineHeight: unit(x) }),
	'ta':     (x) => ({ textAlign: x }),
	'tt':     (x) => ({ textTransform: x }),

	'abs':    (_) => ({ position: 'absolute' }),
	'rel':    (_) => ({ position: 'relative' }),
	'top':    (x) => ({ top: unit(x) }),
	'right':  (x) => ({ right: unit(x) }),
	'bottom': (x) => ({ bottom: unit(x) }),
	'left':   (x) => ({ left: unit(x) }),
	'z':      (x) => ({ zIndex: +x }),

	'm':      (x) => ({ margin: unit(x) }),
	'mx':     (x) => ({ marginHorizontal: unit(x) }),
	'my':     (x) => ({ marginVertical: unit(x) }),
	'mt':     (x) => ({ marginTop: unit(x) }),
	'mr':     (x) => ({ marginright: unit(x) }),
	'mb':     (x) => ({ marginBottom: unit(x) }),
	'ml':     (x) => ({ marginLeft: unit(x) }),
	'p':      (x) => ({ padding: unit(x) }),
	'px':     (x) => ({ paddingHorizontal: unit(x) }),
	'py':     (x) => ({ paddingVertical: unit(x) }),
	'pt':     (x) => ({ paddingTop: unit(x) }),
	'pr':     (x) => ({ paddingright: unit(x) }),
	'pb':     (x) => ({ paddingBottom: unit(x) }),
	'pl':     (x) => ({ paddingLeft: unit(x) }),

	'rad':    (x) => ({ borderRadius: +x }),
	'b-c':    (x) => ({ borderColor: colors[x] || x }),
	'bt-c':   (x) => ({ borderTopColor: colors[x] || x }),
	'br-c':   (x) => ({ borderRightColor: colors[x] || x }),
	'bb-c':   (x) => ({ borderBottomColor: colors[x] || x }),
	'bl-c':   (x) => ({ borderLeftColor: colors[x] || x }),
	'b-w':    (x) => ({ borderWidth: unit(x) }),
	'bt-w':   (x) => ({ borderTopWidth: unit(x) }),
	'br-w':   (x) => ({ borderRightWidth: unit(x) }),
	'bb-w':   (x) => ({ borderBottomWidth: unit(x) }),
	'bl-w':   (x) => ({ borderLeftWidth: unit(x) }),
}

const cache = {}

const resolve = (str) => {
	const sig = str.split(' ').sort().join(' ')

	if (cache[sig]) return cache[sig]

	const styles = sig
		.split(' ')
		.map(item => item.split(':'))
		.map(([prop, value]) => {
			if (!properties[prop]) {
				console.warn(`Invalid style key: ${prop}`)
				return {}
			}
			return properties[prop](value)
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

export const createStyleableComponent = (Component) => (props) => <Component {...props} style={convert(props.style)} />
