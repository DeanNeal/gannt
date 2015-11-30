var gulp       = require('gulp'),
	concat     = require('gulp-concat'),
	gutil      = require('gulp-util'),
	watchify   = require('watchify'),
	source     = require('vinyl-source-stream'),
	browserify = require('browserify'),
	less       = require('gulp-less'),
	sass       = require('gulp-sass'),
	path       = require('path'),
	stringify  = require('stringify'),
	connect    = require('gulp-connect'),
	uglify     = require('gulp-uglify'),
	buffer     = require('vinyl-buffer'),
	minifyCSS  = require('gulp-minify-css');

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
	return browserify({
	        entries: [sourceFile],
	        // extensions: ['.jsx'],
	        paths: ['./node_modules','./app-browserify']
    	})
		.transform(stringify(['.tpl']))
		.bundle()
		.on('error', function(e){
			gutil.log(e);
		})
		.pipe(source(destFile))
		.pipe(buffer())
		// .pipe(uglify())
		.pipe(gulp.dest(destFolder))
		.pipe(connect.reload());
});

gulp.task('less', function () {
  return gulp.src('app-browserify/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(less().on('error', gutil.log))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css-browserify'))
    .pipe(connect.reload());

});

gulp.task('sass', function () {
  gulp.src('app-browserify/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css-browserify'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
   gulp.src('index.html')
       .pipe(connect.reload());
});


gulp.task('watch', function() {
    gulp.watch(['app-browserify/views/**/*.js', 'app-browserify/templates/**/*.tpl'], ['browserify']);
    gulp.watch('app-browserify/scss/**/*.scss', ['sass']);
    gulp.watch('app-browserify/less/**/*.less', ['less']);
    gulp.watch('index.html', ['html']);
});

gulp.task('default', ['connect', 'sass', 'less', 'browserify', 'watch']);