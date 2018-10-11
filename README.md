# Stylish

#### A tool for shorthanding react native styles

Currently only for personal use, so it's not listed on npm, but feel free to npm install it from the github url I guess.

## Usage

### resolve(mixed)
This function takes whatever was given to it, flattens the structure, converts any string values in objects via the stylish syntax, and then merges it all into a react native style object.

### addStyle(name, styles)
Adds a new style to the list of styles. This list is for reusable chunks of stylish format strings. You can use these style names within a stylish string, without a following **:** character

### addEnum(name, enum)
Adds an enum to the list of enums. This is usually a list of shorthands for normal values, eg. 'between' will become 'space-between'

### addColor(name, color)
Adds a color to the list of available colors. Only some properties will use values from this pool. eg, color, backgroundColor, borderTopColor etc
Colors can be in any textual format that react native would support anyway.

---

### Todo

 - Add proper unit tests
 - Add caching