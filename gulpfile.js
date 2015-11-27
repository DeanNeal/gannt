var gulp       = require('gulp'),
	concat     = require('gulp-concat'),
	gutil      = require('gulp-util'),
	watchify   = require('watchify'),
	source     = require('vinyl-source-stream'),
	browserify = require('browserify'),
	// less       = require('gulp-less'),
	sass       = require('gulp-sass'),
	path       = require('path');

var sourceFile  = 'app-browserify/app.js',
	destFolder = 'build',
	destFile = 'bundle.js';

gulp.task('browserify', function(){
	return browserify(sourceFile)
		.bundle()
		.on('error', function(e){
			gutil.log(e);
		})
		.pipe(source(destFile))
		.pipe(gulp.dest(destFolder))
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
    .pipe(concat('bundleSassOnly.css'))
    .pipe(gulp.dest('build/css-browserify'));
});


gulp.task('watch', function() {
    // gulp.watch('app-browserify/views/**/*.js', ['browserify']);
  //  gulp.watch('app-browserify/less/**/*.less', ['less']);
    gulp.watch('app-browserify/scss/**/*.scss', ['sass']);

    // var bundler = watchify(sourceFile);
    // bundler.on('update', rebundle);
    
    // function rebundle() {
    //   return bundler.bundle()
    //     .pipe(source(destFile))
    //     .pipe(gulp.dest(destFolder));
    // }
    
    // return rebundle();
});

gulp.task('default', ['sass', 'browserify','watch']);