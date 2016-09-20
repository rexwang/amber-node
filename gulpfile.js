var gulp        = require('gulp'),
    fs          = require('fs'),
    data        = require('gulp-data'),
    jade        = require('gulp-jade'),
    plumber     = require('gulp-plumber'),
    sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
    babel       = require('gulp-babel'),
    watch       = require('gulp-watch'),
    uglify      = require('gulp-uglify'),
    runSequence = require('run-sequence');


gulp.task('views.en', function() {
  return gulp.src('./public/views/jade/*.jade')
    .pipe(plumber())
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./public/lang/en.json'));
    }))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./public/views/build/en'));
});

gulp.task('views.cn', function() {
  return gulp.src('./public/views/jade/*.jade')
    .pipe(plumber())
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./public/lang/cn.json'));
    }))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./public/views/build/cn'));
});

gulp.task('babel', function() {
  return gulp.src('./public/javascripts/jsx/**/*.jsx')
      .pipe(plumber())
      .pipe(babel({
        "presets": ["es2015", "react"]
      }))
      // .pipe(uglify())
      .pipe(gulp.dest('./public/javascripts/build/'));
});

gulp.task('css', function() {
  return gulp.src('./public/stylesheets/scss/**/*.scss')
    .pipe(sass({
      includePaths: ['./public/stylesheets'],
      errLogToConsole: true
    }))
    .pipe(csso())
    .pipe(gulp.dest('./public/stylesheets/build/'));
});


gulp.task('serve', function() {
  watch('./public/views/jade/*.jade', function() { runSequence('views.en', 'views.cn'); });
  watch('./public/stylesheets/scss/**/*.scss', function() { runSequence('css'); });
  watch('./public/javascripts/jsx/**/*.jsx', function() {
    runSequence('babel', 'views.en', 'views.cn');
  });
});

gulp.task('build', function(done) {
  runSequence('views.en', 'views.cn', 'css', 'babel', function() {
    done();
  });
});

