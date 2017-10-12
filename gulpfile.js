'use strict';

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');

gulp.task('dist', () => {
  const filepath = path.resolve(__dirname, 'node_modules/json5/lib/json5.js');
  const file = fs.readFileSync(filepath, 'utf8') +
    'if (typeof window === \'object\') window.JSON5 = JSON5;' +
    stringify.toString();
  const targetpath = path.resolve(__dirname, 'dist/json5.js');
  fs.writeFileSync(targetpath, file, 'utf8');
});

function stringify(obj, replacer = null, space = 2) {
  return JSON5.stringify(obj, replacer, space).replace(/"/g, "'");
}
