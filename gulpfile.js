'use strict';

const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const gulp = require('gulp');

const lib = {
  json5: {
    name: 'JSON5',
    path: 'json5/lib/json5.js',
    after: stringify.toString()
  },
  lodash: {
    name: '_',
    path: 'lodash/lodash.min.js'
  },
  async: {
    name: 'async',
    path: 'async/dist/async.min.js'
  },
  'neo-async': {
    name: 'neo_async',
    path: 'neo-async/async.min.js'
  },
  bluebird: {
    name: 'Bluebird',
    path: 'bluebird/js/browser/bluebird.min.js',
    before: 'var exports = window, module = { exports: exports };',
    after: 'window.Bluebird = module.exports;'
  },
  aigle: {
    name: 'Aigle',
    path: 'aigle/aigle-es5.min.js',
    before: 'var exports = window, module = { exports: exports };',
    after: 'window.Aigle = module.exports;'
  }
};

gulp.task('dist', () => {
  _.forOwn(lib, ({ name, path, before, after }, key) => expose(name, key, path, before, after));
  createHTML();
});

function expose(funcname, filename, filepath, before = '', after = '') {
  const libpath = path.resolve(__dirname, `node_modules/${filepath}`);
  const file = `${before}${fs.readFileSync(libpath, 'utf8')};${after}`;
  const targetpath = path.resolve(__dirname, `dist/${filename}.js`);
  fs.writeFileSync(targetpath, file, 'utf8');
}

function stringify(obj, replacer = null, space = 2) {
  return JSON5.stringify(obj, replacer, space).replace(/"/g, '\'');
}

function createHTML() {
  const html = _.reduce(lib, (html, v, key) => html + `<script src="dist/${key}.js"></script>\n`, '');
  const filepath = path.resolve(__dirname, 'index.html');
  fs.writeFileSync(filepath, html, 'utf8');
}
