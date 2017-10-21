# libweb

Expose libraries to [gh-pages](https://suguru03.github.io/libweb/) for testing functionality.

|Library|Function Name|🌍|
|---|---|---|
|json5|JSON5|[:arrow_upper_right:](https://github.com/json5/json5)|
|lodash|_|[:arrow_upper_right:](https://github.com/lodash/lodash)|
|async|async|[:arrow_upper_right:](https://github.com/caolan/async)|
|neo-async|neo_async|[:arrow_upper_right:](https://github.com/suguru03/neo-async)|
|aigle|Aigle|[:arrow_upper_right:](https://github.com/suguru03/aigle)|
|bluebird|Bluebird|[:arrow_upper_right:](https://github.com/petkaantonov/bluebird)|


Also, `stringify` funciton is exposed, the detail is as below.

```js
function stringify(obj, replacer = null, space = 2) {
  return JSON5.stringify(obj, replacer, space).replace(/"/g, "'");
}
```
