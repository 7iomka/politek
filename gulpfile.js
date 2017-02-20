'use strict';

const pkg = require('./package.json');
const fractal = require('./fractal.js');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const del = require('del');
const fs = require('fs');
const path = require('path');
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
const mkdirp = require('mkdirp');
const cleanDest = require('gulp-clean-dest');
// const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let paths = {
  // build: __dirname + '/www',
  dest: __dirname + (isDevelopment ? '/tmp' : '/www'),
  src: __dirname + '/src',
  modules: __dirname + '/node_modules'
};

// if is production
// if (!isDevelopment) {
//   paths.dest = __dirname + '/www'
// }

// Build static site (Fractal)
// function build() {
//   const builder = fractal.web.builder();
//
//   builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
//   builder.on('error', err => logger.error(err.message));
//
//   return builder.build().then(() => {
//     logger.success('Fractal build completed!');
//   });
// };


// Serve dynamic site (Fractal)
function serve() {
  const server = fractal.web.server({
    sync: true
  });
  const logError = err => logger.error(err.message)
  const logRunning = () => logger.success(`Fractal server is now running at ${server.url}`)


  server.on('error', logError)
        .start()
        .then(logRunning)

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



/** gulp task for webpack - js files **/
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
      // .pipe(gulpIf(!isDevelopment, uglify()))
      .pipe(gulp.dest(`${paths.dest}/assets/scripts`))
      .on('data', function() {
        gulplog.debug('callback is called'+ callback.called == true);
        if (firstBuildReady && !callback.called) {
          callback.called = true;
          callback();
        }
      });

});

// separate js files (vendors)
function vendorsScripts() {
  return gulp.src(paths.src + '/assets/scripts/vendors/**/*.js')
  .pipe(gulp.dest(paths.dest + '/assets/scripts/vendors'));
};


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
const compile = gulp.series(clean, gulp.parallel('webpack', meta, fonts, icons, images, vectors, styles, vendorsScripts));
// const compile = gulp.series(clean, gulp.parallel( scripts));


gulp.task('start', gulp.series(compile, serve));
gulp.task('lint', gulp.series(lintstyles));
gulp.task('dev', gulp.series(compile, watch));
// gulp.task('test', gulp.series(build, audit));
// gulp.task('publish', gulp.series(build, deploy));


// Clean build dirrectory
function cleanBuild(cb) {
  return gulp.src('www/**/*')
        .pipe(cleanDest('www'));
      cb();
}

const compileBuildAssets = gulp.parallel('webpack', meta, fonts, icons, images, vectors, styles, vendorsScripts);
gulp.task('cleanBuild', cleanBuild);
gulp.task('compileBuildAssets', compileBuildAssets);
gulp.task('customBuild', customBuild);

function renderComponent(args, done){
   const app = fractal;
   const target = app.components.find(args.component);
   if (target) {
       app.components.render(target, null, null, {
           preview: args.options.layout
       }).then(function(html){
           const filePath = path.join('./', args.options.output || '', `${target.handle}.html`);
           fs.writeFile(filePath, html, function(err){
               if (err) {
                   app.cli.console.error(`Error rendering ${args.component} - ${err.message}`);
               } else {
                   app.cli.console.success(`Component ${args.component} rendered to ${filePath}`);
               }
               done();
           });
       });
   } else {
       app.cli.console.error(`Component ${args.component} not found`);
   }
};

function customBuild(cb){

    const destdir = 'www/';
    fractal.components.load().then(() => {
        for (let item of fractal.components.flatten()) {
        
            if (item.relViewPath.startsWith('templates')) {
              renderComponent({
                component: `@${item.handle}`,
                options: {
                  output: destdir,
                  layout: true
                }
              }, function () {
                 fractal.cli.log(`@${item.handle} render completed`);
              })
            }
        }
    });

cb();

}

gulp.task('build', gulp.series(cleanBuild,compileBuildAssets,customBuild));
