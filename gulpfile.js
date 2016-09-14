var gulp    = require('gulp'),
    fs      = require('fs'),
    data    = require('gulp-data'),
    jade    = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    sass    = require('gulp-sass'),
    csso    = require('gulp-csso'),
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
  gulp.watch('./views/*.jade', ['views.en', 'views.cn']);
  gulp.watch('./public/stylesheets/**/*.scss', ['css']);
  gulp.watch('./public/javascripts/**/*.js', ['scripts']);
  gulp.watch('./public/images/**/*', ['images']);
  gulp.watch('./public/fonts/**/*', ['fonts']);
});

gulp.task('build', ['views.en', 'views.cn', 'css', 'scripts', 'images', 'fonts']);
