module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['browserify', 'jasmine'],

        files: [
            './dev/test/**/*.spec.js'
        ],

        exclude: [],

        preprocessors: {
            './dev/test/**/*.spec.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['aliasify', 'babelify', 'stringify']
        },

        browsers: ['PhantomJS'],

        reporters: ['spec'],

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-spec-reporter',
            'karma-browserify'
        ]
    });
};
