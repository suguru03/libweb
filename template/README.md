# libweb

Expose libraries to [gh-pages](https://suguru03.github.io/libweb/) for testing functionality.

${list}

Also, `stringify` funciton is exposed, the detail is as below.

```js
function stringify(obj, replacer = null, space = 2) {
  return JSON5.stringify(obj, replacer, space).replace(/"/g, "'");
}
```
