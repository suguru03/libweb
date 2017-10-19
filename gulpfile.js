'use strict';

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');

gulp.task('dist', () => {
  exposeLodash();
  exposeJSON5();
});

function exposeLodash() {
  expose('_', 'lodash', 'json5/lib/json5.js');
}

function exposeJSON5() {
  expose('JSON5', 'json5', 'json5/lib/json5.js', stringify.toString());
}

function expose(funcname, filename, filepath, extra = '') {
  const libpath = path.resolve(__dirname, `node_modules/${filepath}`);
  const file = `${fs.readFileSync(libpath, 'utf8')};if (typeof window === 'object') window.${funcname} = ${funcname};${extra}`;
  const targetpath = path.resolve(__dirname, `dist/${filename}.js`);
  fs.writeFileSync(targetpath, file, 'utf8');
}

function stringify(obj, replacer = null, space = 2) {
  return JSON5.stringify(obj, replacer, space).replace(/"/g, '\'');
}
