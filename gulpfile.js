var gulp        = require('gulp'),
    fs          = require('fs'),
    data        = require('gulp-data'),
    jade        = require('gulp-jade'),
    plumber     = require('gulp-plumber'),
    sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
    runSequence = require('run-sequence'),
    babel       = require('gulp-babel'),
    watch       = require('gulp-watch'),
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

gulp.task('babel', function() {
  return gulp.src('./public/javascripts/jsx/**/*.jsx')
      .pipe(plumber())
      .pipe(babel({
        "presets": ["es2015", "react"]
      }))
      .pipe(gulp.dest('./public/javascripts/build/'));
});

gulp.task('scripts', function() {
  return gulp.src('./public/javascripts/main.js')
    .pipe(plumber())
    .pipe(requirejsOptimize(function() {
      return {
        mainConfigFile: './public/javascripts/main.js',
        include: ['main'],
        name: 'bower_components/almond/almond',
        wrap: true,
        optimize: 'none'
      };
    }))
    .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('css', function() {
  return gulp.src('./public/stylesheets/**/*.scss')
    .pipe(sass({
      includePaths: ['./public/stylesheets'],
      errLogToConsole: true
    }))
    .pipe(csso())
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('images', function () {
  return gulp.src('./public/images/**/*')
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('fonts', function () {
  return gulp.src(['./public/fonts/**/*'])
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('serve', function() {
  watch('./views/*.jade', function() { runSequence('views.en', 'views.cn'); });
  watch('./public/stylesheets/**/*.scss', function() { runSequence('css'); });
  watch('./public/images/**/*', function() { runSequence('images'); });
  watch('./public/fonts/**/*', function() { runSequence('fonts'); });
  watch('./public/javascripts/jsx/**/*.jsx', function() {
    runSequence('babel', 'scripts', 'views.en', 'views.cn');
  });
});

gulp.task('build', function(done) {
  runSequence('views.en', 'views.cn', 'css', 'babel', 'scripts', 'images', 'fonts', function() {
    done();
  });
});

