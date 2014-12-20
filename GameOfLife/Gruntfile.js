module.exports = function (grunt) { // jshint ignore:line

    grunt.initConfig({
copy: {
  imports: {
files: [
      // includes files within path and its sub-directories
      {expand: true, src: ['Imports/**/*.js'], dest: 'BuildOutput'},
   ],
  }, html: {
files: [
      // includes files within path and its sub-directories
      {expand: true, src: ['index.html'], dest: 'BuildOutput'},
   ],
  },

},
        clean: ["BuildOutput/Imports"],
        typescript: {
            base: {
                src: ["main.ts", "Rendering.ts", "Rendering_test.ts"],
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    //grunt.registerTask('default', ['jscs', 'tslint', 'jshint', 'typescript', 'karma']);
    grunt.registerTask('default', ['jscs', 'tslint', 'jshint', 'typescript','clean', 'copy:imports','copy:html', 'karma']);

};
