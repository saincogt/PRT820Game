// Author: Sancho
// Sometimes there is an error of 'Cannot find module '...''
// It can be resolved by running commands 'rm -rf node_modules' and 'npm install'

var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imageResize = require('gulp-image-resize');
var browserify = require('gulp-browserify');
var source = require('vinyl-source-stream');

// Lint task
gulp.task('jshint', function () {
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
	});

gulp.task('deps', function() {
	return gulp.src('node_modules/phaser/build/phaser.min.js')
		.pipe(gulp.dest('build.js'));
});

gulp.task('default', function () {
	// default tasks

	return gutil.log("Gulp is running!");
	});

// Watch task, watch if something was changed
gulp.task('watch', function() {
	// gulp.watch('src/*.js', ['jshint']);
	gulp.watch(['src/obj/*.js', 'src/states/*.js'], ['browserify']);

});
//Users/SayNo/Google Drive/LastMile

gulp.task('imageResize', function () {
	gulp.src('assets/img/*.jpg')
	.pipe(imageResize({
		width: 100,
		height: 100,
		crop: true,
		upscale: false
		}))
	.pipe(gulp.dest('build/assets'))
	});

gulp.task('browserify', function () {
	gulp.src('src/main.js')
	.pipe(browserify())
	.pipe(gulp.dest('build/js'))
	})

