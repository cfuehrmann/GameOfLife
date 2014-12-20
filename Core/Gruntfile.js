module.exports = function (grunt) { // jshint ignore:line

    grunt.initConfig({

        typescript: {
            base: {
                src: ["Exceptions.ts", "Exceptions_test.ts", "Integers.ts", "Integers_test.ts", "Arrays.ts", "Arrays_test.ts"],
                dest: 'Buildoutput',
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
            all: {
                options: {
                },
                files: {
                    src: [ "*.js" ] 
                }
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
            all: ['*.js']
        },
        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jscs', 'tslint', 'jshint', 'typescript', 'karma']);
};