var gulp    = require('gulp'),
    fs      = require('fs'),
    data    = require('gulp-data'),
    jade    = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    requirejsOptimize = require('gulp-requirejs-optimize');

gulp.task('views.en', function() {
  return gulp.src('./views/*.jade')
    .pipe(plumber())
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./lang/en.json'));
    }))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./dist/en'));
});

gulp.task('views.cn', function() {
  return gulp.src('./views/*.jade')
    .pipe(plumber())
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./lang/cn.json'));
    }))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./dist/cn'));
});

gulp.task('scripts', function() {
  return gulp.src('./public/javascripts/main.js')
    .pipe(requirejsOptimize(function() {
      return {
        mainConfigFile: './public/javascripts/main.js',
        include: ['main'],
        name: 'bower_components/almond/almond',
        wrap: true
      };
    }))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build', ['views.en', 'views.cn']);

gulp.task('serve', function() {
  gulp.watch('./views/*.jade', ['views.en', 'views.cn']);
});
