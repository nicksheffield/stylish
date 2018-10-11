# Stylish

#### A tool for shorthanding react native styles

Currently only for personal use, so it's not listed on npm, but feel free to npm install it from the github url I guess.

## Usage

### resolve(mixed)
This function takes whatever was given to it, flattens the structure, converts any string values into objects via the stylish syntax, and then merges it all into a react native style object.

eg: the following are all equivalent
```javascript
<View style={stylish.resolve("bg:black txt:white fd:row jc:center")} />
<View style={stylish.resolve(["bg:black", ["txt:white", ["fd:row", ["jc:center"]]]])} />
<View style={stylish.resolve(["bg:black txt:white", "fd:row jc:center"])} />
<View style={stylish.resolve(["bg:black txt:white", { flexDirection: 'row', justifyContent: 'center' }])} />
<View style={stylish.resolve({ backgroundColor: 'black', color: 'white', flexDirection: 'row', justifyContent: 'center' }])} />
```

---

### addStyle(name, styles)
Adds a new style to the list of styles. This list is for reusable chunks of styles. This can be in any format. You can use these style names within a stylish string, without a following **:** character. Think of these as traditional class names.

eg: the following are all equivalent
```javascript
stylish.addStyle('important', 'txt:red fw:bold')
stylish.addStyle('important', ['txt:red', { fontWeight: 'bold' }])
stylish.addStyle('important', { color: 'red', fontWeight: 'bold' })
...
<StyledElement style="important">Alert!</StyledElement>
```

---

### addEnum(name, enum)
Adds an enum to the list of enums. This is usually a list of shorthand for a normal value, eg. 'between' will become 'space-between'

eg: 
```javascript
stylish.addEnum('sans', '"Helvetica Neue", Helvetica, Arial, sans-serif')
```

---

### addColor(name, color)
Adds a color to the list of available colors. Only some properties will use values from this pool. eg, color, backgroundColor, borderTopColor etc.

Colors can be in any textual format that react native would support anyway.

eg:
```javascript
stylish.addColor('primary', '#DD0000')
```

---

### createStylishComponent(Component)
Wraps a react component with a functional one that will parse the style prop and pass it on to the original component.

eg:
```javascript
import { Text as RNText } from 'react-native'
import { createStylishComponent } from 'stylish'
export const Text = createStylishComponent(RNText)
...
<Text style="txt:orange bg:red m:5">Ayo</Text>
```

---

### Todo

 - Add proper unit tests
 - Add caching
 - List all the shorthand property names, and some of the default enums and styles