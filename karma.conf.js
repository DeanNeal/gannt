var aliasifyConfig = {
    aliases: {
        "base": "./dev/src/base",
        "collections": "./dev/src/collections",
        "models": "./dev/src/models",
        "router": "./dev/src/router",
        "templates": "./dev/src/templates",
        "views": "./dev/src/views"
    }
};

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
            transform: ['babelify', ['aliasify', aliasifyConfig], 'stringify']
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
