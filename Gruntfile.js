module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('connect-livereload');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.initConfig({
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:9000/'
                    },
                    base: [
                        ''
                    ]
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['app/**/*.js', 'app/**/*.tpl', 'app/**/*.scss'],
                tasks: ['requirejs', 'sass'],
                options: {
                    interrupt: true
                }
            }
        },
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'build/styles.css': 'app/scss/main.scss'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseurl: 'app/',
                    include: ['app'],
                    name: 'almond',
                    mainConfigFile: 'app/r.js',
                    optimize: 'none',
                    generateSourseMaps: true,
                    out: 'build/app.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['connect', 'sass', 'requirejs', 'watch']);

};