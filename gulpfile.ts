import * as fs from 'fs';
import * as path from 'path';

import * as _ from 'lodash';
import * as JSON5 from 'json5';

const libMap = {
  json5: {
    name: 'JSON5',
    path: 'json5/dist/index.js',
    after: stringify.toString(),
    url: 'https://github.com/json5/json5',
  },
  lodash: {
    name: '_',
    path: 'lodash/lodash.min.js',
    url: 'https://github.com/lodash/lodash',
  },
  async: {
    name: 'async',
    path: 'async/dist/async.min.js',
    url: 'https://github.com/caolan/async',
  },
  'neo-async': {
    name: 'neo_async',
    path: 'neo-async/async.min.js',
    url: 'https://github.com/suguru03/neo-async',
  },
  aigle: {
    name: 'Aigle',
    path: 'aigle/aigle-es5.min.js',
    before: 'var exports = window, module = { exports: exports };',
    after: 'window.Aigle = module.exports;',
    url: 'https://github.com/suguru03/aigle',
  },
  bluebird: {
    name: 'Bluebird',
    path: 'bluebird/js/browser/bluebird.min.js',
    before: 'var exports = window, module = { exports: exports };',
    after: 'window.Bluebird = module.exports;',
    url: 'https://github.com/petkaantonov/bluebird',
  },
};

export const build = async () => {
  _.forOwn(libMap, ({ name, path, before, after }, key) => expose(name, key, path, before, after));
  createHTML();
  createMarkDown();
};

function expose(funcname: any, filename: any, filepath: any, before: string = '', after: string = '') {
  const libpath = path.resolve(__dirname, `node_modules/${filepath}`);
  const file = `${before}${fs.readFileSync(libpath, 'utf8')};${after}`;
  const targetpath = path.resolve(__dirname, `dist/${filename}.js`);
  fs.writeFileSync(targetpath, file, 'utf8');
}

function stringify(obj: any, replacer: any = null, space: number = 2) {
  return JSON5.stringify(obj, replacer, space).replace(/"/g, "'");
}

function createMarkDown() {
  const template = path.resolve(__dirname, 'template', 'README.md');
  const filepath = path.resolve(__dirname, 'README.md');
  const file = fs.readFileSync(template, 'utf8');
  const list = _.reduce(
    libMap,
    (html, { name, url }, key) => `${html}|${key}|${name}|[:arrow_upper_right:](${url})|\n`,
    '|Library|Function Name|🌍|\n|---|---|---|\n',
  );
  fs.writeFileSync(filepath, _.template(file)({ list }), 'utf8');
}

function createHTML() {
  _.forEach(libMap, (v, name) => createPages(name));
  const head = `<head>${_.map(libMap, (v, key) => `<script src="dist/${key}.js"></script>`).join('\n')}</head>`;
  const table = `<table><tr><th>Library</th><th>Function Name</th><th>🌍<th></tr>${_.map(
    libMap,
    ({ name, url }, key) =>
      `<tr><td>${key}</td><td><a href="${getUrl(
        key,
      )}">${name}</a></td><td><a href="${url}" target="_blank">${url}</a></td></tr>`,
  ).join('\n')}</table>`;
  const body = `<body><p>Open developer tools and use console :)</p>${table}</body>`;
  const filepath = path.resolve(__dirname, 'index.html');
  const html = head + body;
  fs.writeFileSync(filepath, html);
}

function getUrl(name: string) {
  return `pages/${name}.html`;
}

function createPages(name: string) {
  const dirname = path.resolve(__dirname, 'pages');
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  const page = path.join(__dirname, getUrl(name));
  const head = `<head><script src="../dist/${name}.js"></script></head>`;
  const body = `<body><p>{name}</p></body>`;
  const html = head + body;
  fs.writeFileSync(page, html);
}
