var gulp       = require('gulp'),
    gutil      = require('gulp-util'),

    watchify   = require('watchify'),
    source     = require('vinyl-source-stream'),
    browserify = require('browserify'),
    sass       = require('gulp-sass'),
    path       = require('path'),
    stringify  = require('stringify'),
    connect    = require('gulp-connect'),
    uglify     = require('gulp-uglify'),
    buffer     = require('vinyl-buffer'),
    sourceMaps = require("gulp-sourcemaps"),
    babel      = require("gulp-babel"),
    concat     = require("gulp-concat"),
    clean      = require('gulp-clean');

var Server = require('karma').Server;

gulp.task('test', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

var projectPath = {
	dev: './dev',
	assets: './dev/assets',
	source: './dev/src',
	build: './build',
	modules: './node_modules',
	vendors: './bower_components'
};

gulp.task('connect', function () {
	connect.server({
		root: '',
		livereload: true
	});
});

gulp.task('clean-scripts', function () {
	return gulp.src(projectPath.build + '/app', {read: false})
	           .pipe(clean());
});

gulp.task('clean-tmp', function () {
	return gulp.src(projectPath.dev + '/tmp', {read: false})
	           .pipe(clean());
});

gulp.task('copy-api', ['clean-scripts', 'clean-tmp'], function () {
	return gulp.src(projectPath.dev + '/api/**')
	           .pipe(gulp.dest(projectPath.build + '/api'))
});

gulp.task("babel", function () {
	return gulp.src(projectPath.source + "/**/*.js")
	           .pipe(babel())
	           .pipe(gulp.dest(projectPath.dev + '/tmp'));
});

var scripts = function() {
	return browserify({
		entries: [projectPath.dev + '/tmp/app.js'],
		paths: [projectPath.modules, projectPath.source]
	})
			.transform(stringify(['.tpl']))
			.bundle()
			.on('error', function (e) {
				gutil.log(e);
			})
			.pipe(source('app.js'))
			.pipe(gulp.dest(projectPath.build + '/app'))
			.pipe(connect.reload());
};


gulp.task('scripts', ['copy-api', 'babel'], scripts);
gulp.task('scripts-watch', ['babel'], scripts);

gulp.task('clean-styles', function () {
	return gulp.src(projectPath.build + '/styles', {read: false})
	           .pipe(clean());
});

gulp.task('copy-fonts', ['clean-styles'], function () {
	return gulp.src(projectPath.assets + '/fonts/**')
	           .pipe(gulp.dest(projectPath.build + '/styles/fonts'));
});

gulp.task('copy-images', ['copy-fonts'], function () {
	return gulp.src(projectPath.assets + '/img/**')
	           .pipe(gulp.dest(projectPath.build + '/img'));
});

var styles = function () {
	return gulp.src(projectPath.assets + '/scss/main.scss')
	           .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	           .pipe(concat('style.css'))
	           .pipe(gulp.dest(projectPath.build + '/styles'))
	           .pipe(connect.reload());
};

gulp.task('styles', ['copy-images'], styles);
gulp.task('styles-watch', styles);

var html = function () {
	return gulp.src('index.html')
	           .pipe(connect.reload());
};

gulp.task('html-watch', html);

gulp.task('watch', function () {
	gulp.watch([projectPath.source + '/**/*.js', projectPath.source + '/templates/**/*.tpl'], ['scripts-watch']);
	gulp.watch(projectPath.assets + '/scss/**/*.scss', ['styles-watch']);
	gulp.watch(projectPath.source + 'index.html', ['html-watch']);
});

gulp.task('default', ['connect', 'styles', 'scripts', 'watch']);