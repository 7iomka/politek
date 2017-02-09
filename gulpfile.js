'use strict';

const pkg = require('./package.json');
const fractal = require('./fractal.js');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const a11y = require('gulp-a11y');
const ghPages = require('gulp-gh-pages');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const postcssAssets = require('postcss-assets');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sassJson = require('node-sass-json-importer');
const stylelint = require('gulp-stylelint');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const logger = fractal.cli.console;
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpIf = require('gulp-if');
const gulplog = require('gulplog');
const gutil = require('gulp-util');

const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const named = require('vinyl-named');


// const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const paths = {
  build: __dirname + '/www',
  dest: __dirname + '/tmp',
  src: __dirname + '/src',
  modules: __dirname + '/node_modules'
};

// const jsVendors = paths.src + '/assets/scripts/vendors/';
// const jsFiles = [
// // paths.modules + '/fontfaceobserver/fontfaceobserver.js',
//
// /** vendors plugins for use in components **/
// // jsVendors + 'jquery.mmenu.all.min.js',
// // jsVendors + 'jquery.flexslider-min.js',
// // jsVendors + 'swiper.min.js',
// // jsVendors + 'photoswipe.min.js',
// // jsVendors + 'photoswipe-ui-default.min.js',
// // jsVendors + 'jquery.spinner.min.js',
// // /** GreenSock / gsap core and plugins **/
// // jsVendors + 'greensock/minified/TweenMax.min.js',
// // jsVendors + 'greensock/minified/plugins/ScrollToPlugin.min.js',
// //
// // /** ScrollMagic core and plugins **/
// // jsVendors + 'scrollmagic/minified/ScrollMagic.min.js',
// // jsVendors + 'scrollmagic/minified/plugins/animation.gsap.min.js',
// //
// // /** components **/
// // // paths.src + '/components/**/*.js',
// // paths.src + '/assets/scripts/app.js'
//
// ];
// Build static site (Fractal)
function build() {
  const builder = fractal.web.builder();

  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));

  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
};

// Serve dynamic site (Fractal)
function serve() {
  const server = fractal.web.server({
    sync: true
  });

  server.on('error', err => logger.error(err.message));

  return server.start().then((e) => {
    // console.log(e)
    logger.success(`Fractal server is now running at ${server.url}`);
  });
};

// Clean
function clean() {
  return del(paths.dest + '/assets/');
};

// Deploy to GitHub pages
function deploy() {
  // Generate CNAME file from `homepage` value in package.json
  let cname = pkg.homepage.replace(/.*?:\/\//g, '');
  fs.writeFileSync(paths.build + '/CNAME', cname);

  // Push contents of build folder to `gh-pages` branch
  return gulp.src(paths.build + '/**/*')
    .pipe(ghPages({
      force: true
    }));
  done();
};

// Meta
function meta() {
  return gulp.src(paths.src + '/*.{txt,json}')
    .pipe(gulp.dest(paths.dest));
};

// Fonts
function fonts() {
  return gulp.src(paths.src + '/assets/fonts/**/*')
    .pipe(gulp.dest(paths.dest + '/assets/fonts'));
};

// Icons
function icons() {
  return gulp.src(paths.src + '/assets/icons/**/*')
    .pipe(plumber({
          errorHandler: notify.onError(err => ({
            title:   'Icons',
            message: err.message
          }))
        }))
    .pipe(gulpIf(!isDevelopment, imagemin()))
    .pipe(gulp.dest(paths.dest + '/assets/icons'));
};

// Images
function images() {
  return gulp.src(paths.src + '/assets/images/**/*')
  .pipe(plumber({
        errorHandler: notify.onError(err => ({
          title:   'Images',
          message: err.message
        }))
      }))
  .pipe(gulpIf(!isDevelopment, imagemin({
    progressive: true,
  })))
    .pipe(gulp.dest(paths.dest + '/assets/images'));
};

// Vectors
function vectors() {
  return gulp.src(paths.src + '/assets/vectors/**/*')
    .pipe(gulp.dest(paths.dest + '/assets/vectors'));
};

// Linting
function lintstyles() {
  return gulp.src(paths.src + '/**/*.scss')
    .pipe(stylelint({
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
};

// Styles
function styles() {
  return gulp.src(paths.src + '/assets/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: [paths.src + '/tokens/'],
      importer: sassJson
    }).on('error', sass.logError))
    .pipe(
      postcss([
      postcssAssets({
        loadPaths: [paths.src + '/assets/vectors']
      }),
      autoprefixer({
        browsers: ['last 100 versions']
      })
      ])
     )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest + '/assets/styles'));
    // .pipe(browserSync.stream({ match: '**/*.css' }));
};


// Accessibility audit
function audit() {
  return gulp.src(paths.build + '/components/preview/**/*.html')
  .pipe(a11y())
  .pipe(a11y.reporter());
};



/** gulp task for webpack **/
gulp.task('webpack', function(callback) {
  let firstBuildReady = false;
  //
  function done(err, stats) {
    firstBuildReady = true;

    if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
      return;  // emit('error', err) in webpack-stream
    }

    gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
      colors: true
    }));

  }

  /** Webpack options **/
  let options = Object.create(webpackConfig);
  return gulp.src(`${paths.src}/app.js`)
      .pipe(plumber({
        errorHandler: notify.onError(err => ({
          title:   'Webpack',
          message: err.message
        }))
      }))
      // .pipe(named()) //-- будем юзать если нужно будет несколько точек входа
      .pipe(webpackStream(options, webpack, done)) // вторым параметром идёт 2-ая версия установленного webpack
      .pipe(gulpIf(!isDevelopment, uglify()))
      .pipe(gulp.dest(`${paths.dest}/assets/scripts`))
      .on('data', function() {
        gulplog.debug('callback is called'+ callback.called == true);
        if (firstBuildReady && !callback.called) {
          callback.called = true;
          callback();
        }
      });

});


// Watch
function watch(done) {
  serve();

  gulp.watch(paths.src + '/assets/fonts', fonts).on('error', function(error) {
      // silently catch 'ENOENT' error typically caused by renaming watched folders
      if (error.code === 'ENOENT') {
        return;
      }
    });
  gulp.watch(paths.src + '/assets/icons', icons).on('error', function(error) {
      // silently catch 'ENOENT' error typically caused by renaming watched folders
      if (error.code === 'ENOENT') {
        return;
      }
    });
  gulp.watch(paths.src + '/assets/images', images).on('error', function(error) {
      // silently catch 'ENOENT' error typically caused by renaming watched folders
      if (error.code === 'ENOENT') {
        return;
      }
    });
  gulp.watch(paths.src + '/assets/vectors', vectors).on('error', function(error) {
      // silently catch 'ENOENT' error typically caused by renaming watched folders
      if (error.code === 'ENOENT') {
        return;
      }
    });
  // gulp.watch(paths.src + '/**/*.js', webpack);
  gulp.watch(paths.src + '/**/*.scss', styles).on('error', function(error) {
      // silently catch 'ENOENT' error typically caused by renaming watched folders
      if (error.code === 'ENOENT') {
        return;
      }
    });

};



// Task sets
const compile = gulp.series(clean, gulp.parallel('webpack', meta, fonts, icons, images, vectors, styles));
// const compile = gulp.series(clean, gulp.parallel( scripts));


gulp.task('start', gulp.series(compile, serve));
gulp.task('lint', gulp.series(lintstyles));
gulp.task('build', gulp.series(compile, build));
gulp.task('dev', gulp.series(compile, watch));
gulp.task('test', gulp.series(build, audit));
gulp.task('publish', gulp.series(build, deploy));
