var gulp         = require('gulp'),
    gutil        = require('gulp-util'),

    _            = require('underscore'),
    watchify     = require('watchify'),
    source       = require('vinyl-source-stream'),
    browserify   = require('browserify'),
    sass         = require('gulp-sass'),
    path         = require('path'),
    sourcemaps   = require("gulp-sourcemaps"),
    stringify    = require('stringify'),
    connect      = require('gulp-connect'),
    uglify       = require('gulp-uglify'),
    streamify    = require('gulp-streamify'),
    buffer       = require('vinyl-buffer'),
    babel        = require("gulp-babel"),
    concat       = require("gulp-concat"),
    clean        = require('gulp-clean'),
    babelify     = require('babelify'),
    bowerResolve = require('bower-resolve'),
    nodeResolve  = require('resolve'),
    preprocess   = require('gulp-preprocess'),
    gulpif       = require('gulp-if'),
    parseArgs    = require('minimist'),
    runSequence  = require('run-sequence');

var Server = require('karma').Server;

var config = _.extend({
    env: process.env.NODE_ENV
}, parseArgs(process.argv.slice(2)));

gulp.task('set-dev-node-env', function () {
    return process.env.NODE_ENV = config.env = 'dev';
});

gulp.task('set-prod-node-env', function () {
    return process.env.NODE_ENV = config.env = 'prod';
});

var preprocess_settings = {context: {NODE_ENV: config.env}};

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

var getBowerPackageIds = function () {
    var bowerManifest = {};
    try {
        bowerManifest = require('./bower.json');
    } catch (e) {
        onError(e);
    }
    return _.keys(bowerManifest.dependencies) || [];
};

var getNPMPackageIds = function () {
    var packageManifest = {};
    try {
        packageManifest = require('./package.json');
    } catch (e) {
        onError(e);
    }
    return _.keys(packageManifest.dependencies) || [];
};

var onError = function (err) {
    gutil.log(gutil.colors.red.bold('[ERROR]:'), gutil.colors.bgRed(err.message));
    this.emit('end');
};

gulp.task('connect', function () {
    connect.server({
        root: '',
        livereload: true
    });
});

gulp.task('clean-tmp', function () {
    var filesToMove = [
        projectPath.dev + '/tmp',
        projectPath.build + '/app'
    ];

    return gulp.src(filesToMove, {read: false, base: './'})
        .pipe(clean({force: true}));
});

var copyTemplates = function () {
    gulp.src(projectPath.source + '/templates/**/*.tpl')
        .pipe(gulp.dest(projectPath.dev + '/tmp/templates'));
};

gulp.task('copy-templates-build', ['clean-tmp'], copyTemplates);
gulp.task('copy-templates', copyTemplates);

gulp.task('copy-api', ['clean-tmp'], function () {
    gulp.src(projectPath.dev + '/api/**')
        .pipe(gulp.dest(projectPath.build + '/api'));
});

var babelBuild = function () {
    return gulp.src(projectPath.source + "/**/*.js")
        .pipe(preprocess(preprocess_settings))
        .pipe(gulpif(config.env === 'dev', sourcemaps.init()))
        .pipe(babel()).on('error', onError)
        .pipe(gulpif(config.env === 'dev', sourcemaps.write(".")))
        .pipe(gulp.dest(projectPath.dev + '/tmp'));
};

gulp.task("babel-build", ['copy-templates-build', 'copy-api', 'build-vendor'], babelBuild);
gulp.task("babel", ['copy-templates'], babelBuild);

gulp.task('build-vendor', function () {
    var b = browserify({
        transform: ['browserify-shim']
    });

    getBowerPackageIds().forEach(function (id) {
        b.require(bowerResolve.fastReadSync(id), {expose: id});
    });

    getNPMPackageIds().forEach(function (id) {
        b.require(nodeResolve.sync(id), {expose: id});
    });

    return b.bundle()
        .on('error', onError)
        .pipe(source('vendor.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(projectPath.build + '/app'));
});

var scripts = function () {

    var b = browserify({
        entries: [projectPath.dev + '/tmp/app.js'],
        transform: ["aliasify", "babelify", stringify(['.tpl'])]
    });

    getBowerPackageIds().forEach(function (lib) {
        b.external(lib);
    });

    getNPMPackageIds().forEach(function (id) {
        b.external(id);
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(config.env === 'dev', sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.env === 'prod', uglify()).on('error', onError))
        .pipe(gulpif(config.env === 'dev', sourcemaps.write('./')))
        .pipe(gulp.dest(projectPath.build + '/app'))
        .pipe(connect.reload());
};

gulp.task('scripts', ['babel-build'], scripts);
gulp.task('scripts-watch', ['babel'], scripts);

gulp.task('clean-styles', function () {
    return gulp.src(projectPath.build + '/styles', {read: false})
        .pipe(clean());
});

gulp.task('copy-fonts', function () {
    return gulp.src(projectPath.assets + '/fonts/**')
        .pipe(gulp.dest(projectPath.build + '/styles/fonts'));
});

gulp.task('copy-images', function () {
    return gulp.src(projectPath.assets + '/img/**')
        .pipe(gulp.dest(projectPath.build + '/img'));
});

gulp.task('style-assets', function(callback){
    runSequence(
        'clean-styles',
        ['copy-fonts', 'copy-images'],
        callback);
});

var styles = function () {
    return gulp.src(projectPath.assets + '/scss/main.scss')
        .pipe(gulpif(config.env === 'dev', sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulpif(config.env === 'dev', sourcemaps.write()))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(projectPath.build + '/styles'))
        .pipe(connect.reload());
};

gulp.task('styles', ['style-assets'], styles);
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

gulp.task('build', ['connect', 'styles', 'scripts', 'watch']);

gulp.task('dev', ['set-dev-node-env'], function () {
    return runSequence(
        'build'
    );
});

gulp.task('prod', ['set-prod-node-env'], function () {
    return runSequence(
        'build'
    );
});