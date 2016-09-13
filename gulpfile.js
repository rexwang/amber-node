var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
    jade        = require('gulp-jade'),
    data        = require('gulp-data'),
    fs          = require('fs'),
    runSequence = require('run-sequence');

gulp.task('js', function() {
  return gulp.src('fe/dev/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('fe/dist/js'));
});

gulp.task('css', function() {
  return gulp.src('fe/dev/stylesheets/**/*.scss')
    .pipe(sass({
      includePaths: ['fe/dev/stylesheets'],
      errLogToConsole: true
    }))
    .pipe(csso())
    .pipe(gulp.dest('fe/dist/stylesheets'));
});

gulp.task('views.en', function() {
  return gulp.src('fe/dev/views/**/*.jade')
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('fe/dev/lang/en.json'));
    }))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('fe/dist/views/en'));
});

gulp.task('views.cn', function() {
  return gulp.src('fe/dev/views/**/*.jade')
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('fe/dev/lang/cn.json'));
    }))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('fe/dist/views/cn'));
});

gulp.task('build', function(done) {
  runSequence('js', 'css', 'views.en', 'views.cn', function() {
    done();
  });
});

gulp.task('default', function() {
  gulp.watch('fe/dev/js/**/*.js', ['js']);
  gulp.watch('fe/dev/stylesheets/**/*.scss', ['css']);
  gulp.watch('fe/dev/views/**/*.jade', ['views.en', 'views.cn']);
});
