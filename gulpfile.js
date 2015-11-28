var gulp       = require('gulp'),
	concat     = require('gulp-concat'),
	gutil      = require('gulp-util'),
	watchify   = require('watchify'),
	source     = require('vinyl-source-stream'),
	browserify = require('browserify'),
	// less       = require('gulp-less'),
	sass       = require('gulp-sass'),
	path       = require('path'),
	jstify     = require('jstify'),
	_          = require('underscore'),
	stringify  = require('stringify'),
	connect    = require('gulp-connect');

var sourceFile  = 'app-browserify/app.js',
	destFolder = 'build',
	destFile = 'bundle.js';

gulp.task('connect', function() {
    connect.server({
        root: '',
        livereload: true
    });
});


gulp.task('browserify', function(){
	return browserify(sourceFile)
		.transform(stringify(['.tpl']))
		.bundle()
		.on('error', function(e){
			gutil.log(e);
		})
		.pipe(source(destFile))
		.pipe(gulp.dest(destFolder))
		.pipe(connect.reload());
});

// gulp.task('less', function () {
//   return gulp.src('app-browserify/less/**/*.less')
//     .pipe(less({
//       paths: [ path.join(__dirname, 'less', 'includes') ]
//     }))
//     .pipe(gulp.dest('build/css-browserify'));
// });

gulp.task('sass', function () {
  gulp.src('app-browserify/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css-browserify'))
    .pipe(connect.reload());
});


gulp.task('watch', function() {
    gulp.watch(['app-browserify/views/**/*.js', 'app-browserify/views/**/*.tpl'], ['browserify']);
    gulp.watch('app-browserify/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'sass', 'browserify','watch']);