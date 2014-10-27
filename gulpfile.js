'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('js', function () {
  var bundler = browserify('./assets/js/monkey.js');

  return bundler.bundle()
    .on('error', console.log.bind(console, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./assets/build'));
});

gulp.task('sass', function () {
  return gulp.src(['assets/sass/*.{sass,scss}', '!assets/sass/_*.{sass,scss}'])
    .pipe(plugins.rubySass())
    .pipe(plugins.plumber())
    .pipe(plugins.autoprefixer())
//		.pipe(plugins.minifyCss())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('browser-sync', function () {
  browserSync.init([
    'assets/**/*.css',
    'assets/**/*.js',
    'assets/imgs/**/*.jpg',
    'assets/imgs/**/*.png',
    '**/*.html',
    'test/**/*.js'
  ], {
    server: {
      baseDir: '.'
    },
    ghostMode: {
      scroll: true,
      links: true,
      forms: true
    }
  });
});

gulp.task('default', ['js', 'sass', 'browser-sync'], function () {
  gulp.watch('assets/**/*.{sass,scss}', ['sass']);
  gulp.watch('assets/js/**/*.js', ['js']);
});
