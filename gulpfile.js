var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint task
gulp.task('jshint', function () {
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
	});

gulp.task('default', function () {
	// default tasks

	return gutil.log("Gulp is running!");
	});

// Watch task, watch if something was changed
gulp.task('watch', function() {
	gulp.watch('js/*.js', ['jshint']);
});