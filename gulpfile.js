'use strict';

const fs = require('fs');
const path = require('path');

const gulp = require('gulp');

gulp.task('dist', () => {
  const filepath = path.resolve(__dirname, 'node_modules/json5/lib/json5.js');
  const file = fs.readFileSync(filepath, 'utf8') + 'typeof window && window.JSON5 = JSON5;';
  const targetpath = path.resolve(__dirname, 'dist/json5.js');
  fs.writeFileSync(targetpath, file, 'utf8');
});
