module.exports = function (grunt) { // jshint ignore:line

    require('load-grunt-tasks')(grunt); // jshint ignore:line
    require('time-grunt')(grunt); // jshint ignore:line

    grunt.initConfig({

        typescript: {
            base: {
                src: ["*.ts"],
                dest: 'BuildOutput',
                options: {
                    module: 'amd',
                    noImplicitAny: true,
                    target: 'es5', //or es3
                    //  sourceMap: true,
                    declaration: true
                }
            }
        },

        jscs: {
            options: {
            },
            files: {
                src: ["*.js"]
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
            },
        },

        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['newer:jscs', 'newer:tslint', 'newer:jshint', 'typescript', 'karma']);
};
