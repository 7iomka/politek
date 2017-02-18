'use strict';

const fractal = require('@frctl/fractal').create();

const paths = {
  build: __dirname + '/www',
  src: __dirname + '/src',
  static: __dirname + '/tmp'
};

const mandelbrot = require('@frctl/mandelbrot')({
  favicon: '/assets/icons/icon.ico',
  lang: 'ru-ru',
  styles: ['default', '/assets/styles/theme.css'],
  static: {
    mount: 'fractal'
  }
});

const md_abbr = require('markdown-it-abbr');
const md_prism = require('markdown-it-prism');
const md = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  typographer: true
}).use(md_abbr).use(md_prism, {
  plugins: [
    'highlight-keywords',
    'show-language'
  ]
});

const nunjucks = require('@frctl/nunjucks')({
  filters: {
    date: require('nunjucks-date'),
    markdown: function(str) {
      return md.render(str);
    },
    markdownInline: function(str) {
      return md.renderInline(str);
    },
    slugify: function(str) {
      return str.toLowerCase().replace(/[^\w]+/g, '');
    },
    stringify: function () {
      return JSON.stringify(this, null, "\t");
    },
    // {% set modifiedArray = myArray|pushIn('myValue') %}
    pushIn: function(array, value) {
      array.push(value);
      return array;
    },
    addToObj: function (obj, key, value) {
      obj[key] = value;
      return obj;
    },
    objAssign: function (obj, newObj) {
      return Object.assign({}, obj, newObj);
    },
    isString: function(obj) {
      return typeof obj == 'string';
    },
    isObject: function(obj) {
      return typeof obj == 'object';
    },
    makePrice: function(str) {
      return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    },
  },
  paths: [
    paths.static + '/assets/vectors',
    paths.src + '/components/_macros',
  ]
});

// Project config
fractal.set('project.title', 'Политек');

// Components config
fractal.components.engine(nunjucks);
fractal.components.set('default.preview', '@preview');
fractal.components.set('default.status', 'prototype');
fractal.components.set('ext', '.html');
fractal.components.set('path', paths.src + '/components');

// Docs config
fractal.docs.engine(nunjucks);
fractal.docs.set('ext', '.md');
fractal.docs.set('path', paths.src + '/docs');

// Web UI config
fractal.web.theme(mandelbrot);
fractal.web.set('static.path', paths.static);
fractal.web.set('builder.dest', paths.build);
fractal.web.set('builder.urls.ext', 'html');
// fractal.web.set('server.syncOptions', {
//     injectChanges: true,
//     // proxy: 'localhost:3000', // localhost served url
//     notify: false,
//     reloadDelay: 2000
// });

// Export config
module.exports = fractal;
