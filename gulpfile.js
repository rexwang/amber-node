var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    csso        = require('gulp-csso'),
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

gulp.task('build', function(done) {
  runSequence('js', 'css', function() {
    done();
  });
});

gulp.task('default', function() {
  gulp.watch('fe/dev/js/**/*.js', ['js']);
  gulp.watch('fe/dev/stylesheets/**/*.scss', ['css']);
});
