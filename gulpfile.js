var gulp        = require('gulp');
var fs          = require('fs');
var data        = require('gulp-data');
var jade        = require('gulp-jade');
var plumber     = require('gulp-plumber');
var sass        = require('gulp-sass');
var csso        = require('gulp-csso');
var babel       = require('gulp-babel');
var watch       = require('gulp-watch');
var uglify      = require('gulp-uglify');
var runSequence = require('run-sequence');

var scriptPath  = './public/scripts';
var cssPath     = './public/stylesheets';
var viewsPath   = './public/views';
var langPath    = './public/lang';

gulp.task('views.en', function() {
  return gulp.src(viewsPath + '/jade/*.jade')
    .pipe(plumber())
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync(langPath + '/en.json'));
    }))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(viewsPath + '/build/en'));
});

gulp.task('views.cn', function() {
  return gulp.src(viewsPath + '/jade/*.jade')
    .pipe(plumber())
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync(langPath + '/cn.json'));
    }))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(viewsPath + '/build/cn'));
});

gulp.task('babel', function() {
  return gulp.src(scriptPath + '/jsx/**/*.jsx')
      .pipe(plumber())
      .pipe(babel({
        "presets": ["es2015", "react"]
      }))
      // .pipe(uglify())
      .pipe(gulp.dest(scriptPath + '/build/'));
});

gulp.task('css', function() {
  return gulp.src(cssPath + '/scss/**/*.scss')
    .pipe(sass({
      includePaths: ['./public/stylesheets'],
      errLogToConsole: true
    }))
    .pipe(csso())
    .pipe(gulp.dest(cssPath + '/build/'));
});


gulp.task('serve', function() {
  watch(viewsPath + '/jade/*.jade', function() { runSequence('views.en', 'views.cn'); });
  watch(cssPath + '/scss/**/*.scss', function() { runSequence('css'); });
  watch(scriptPath + '/jsx/**/*.jsx', function() {
    runSequence('babel', 'views.en', 'views.cn');
  });
});

gulp.task('build', function(done) {
  runSequence('views.en', 'views.cn', 'css', 'babel', function() {
    done();
  });
});

