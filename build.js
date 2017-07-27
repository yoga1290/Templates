var fs = require("fs")
var browserify = require('browserify')
var vueify = require('vueify')


// fs.createReadStream('./node_modules/vaadin-icons/assets/fonts/Vaadin-Icons.eot').pipe(fs.createWriteStream('./public/Vaadin-Icons.eot'));
// fs.createReadStream('./node_modules/vaadin-icons/assets/fonts/Vaadin-Icons.woff').pipe(fs.createWriteStream('./public/aadin-Icons.woff'));
// fs.createReadStream('./node_modules/vaadin-icons/assets/fonts/Vaadin-Icons.ttf').pipe(fs.createWriteStream('./public/Vaadin-Icons.ttf'));
// fs.createReadStream('./node_modules/vaadin-icons/assets/fonts/Vaadin-Icons.svg').pipe(fs.createWriteStream('./public/Vaadin-Icons.svg'));
//
fs.createReadStream('./node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(fs.createWriteStream('./css/bootstrap.min.css'));
//
// fs.createReadStream('./node_modules/animate.css/animate.min.css').pipe(fs.createWriteStream('./public/animate.min.css'));

process.env.NODE_ENV = 'production';
browserify('./index.js')
  .transform(vueify)
  .bundle()
.pipe(fs.createWriteStream("./app.js"))
