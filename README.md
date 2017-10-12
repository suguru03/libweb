# JSON5-web

Convert object, variable or JSON to JSON5 on [gh-pages](https://suguru03.github.io/json5-web/)

For now, you need to open the console of developer tools. `JSON5` is exposed into `window` object.

Also, `stringify` funciton is exposed, the detail is as below.

```js
function stringify(obj, replacer = null, space = 2) {
  return JSON5.stringify(obj, replacer, space).replace(/"/g, "'");
}
```
