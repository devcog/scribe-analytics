var gulp = require('gulp'),
  gzip = require('gulp-gzip'),
  jsdoc = require('gulp-jsdoc'),
  // jshint = require('gulp-jshint'),
  nodeunit = require('gulp-nodeunit'),
  rig = require('gulp-rigger'),
  uglify = require('gulp-uglify');

  gulp.task('uglify', () => {
    return gulp.src('src/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
  });

  gulp.task('rig', () => {
    return gulp.src('src/scribe-analytics.js')
      .pipe(rig())
      .pipe(gulp.dest('dist/'));
  });

  gulp.task('watch', function() {
    gulp.start('rig');
    gulp.watch('src/**/*.js', ['rig']);
  });
