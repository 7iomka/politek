var $ = require('jquery');
console.log($);
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./components/', true, /\.js$/));
