module.exports = function (grunt) { // jshint ignore:line

    require('load-grunt-tasks')(grunt); // jshint ignore:line
    require('time-grunt')(grunt); // jshint ignore:line

    grunt.initConfig({

        copy: {
            imports: {
                files: [
                      { expand: true, src: ['Imports/**/*.js'], dest: 'BuildOutput' },
                      {
                          src: ['node_modules/requirejs/require.js'],
                          dest: 'BuildOutput/Imports/RequireJS/require.js'
                      },
                ],
            },
            statics: {
                files: [
                      { expand: true, cwd: 'Static', src: ['**/*'], dest: 'BuildOutput' },
                ],
            },
        },

        jscs: {
            options: {
            },
            files: {
                src: ['*.js']
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: ['*.ts']
            },
        },

        jshint: {
            options: {
                jshintrc: true
            },
            files: {
                src: ['*.js']
            }
        },

        typescript: {
            base: {
                src: ['*.ts'],
                dest: 'BuildOutput',
                options: {
                    module: 'amd',
                    noImplicitAny: true,
                    target: 'es5', //or es3
                    //  sourceMap: true
                }
            },
        },

        karma: {
            chrome: {
                options: {
                    configFile: 'karma.conf.js',
                    browsers: ['Chrome']
                }
            },
            phantomjs: {
                options: {
                    configFile: 'karma.conf.js',
                    browsers: ['PhantomJS']
                }

            }
        }
    });

    grunt.registerTask('build', ['newer:jscs', 'newer:tslint', 'newer:jshint',
        'typescript', 'copy:imports', 'copy:statics']);
    grunt.registerTask('test', function (browser) {
        grunt.task.run('karma:' + browser);
    });
    grunt.registerTask('buildAndTest', function (browser) {
        grunt.task.run('build');
        grunt.task.run('test:' + browser);
    });
};
