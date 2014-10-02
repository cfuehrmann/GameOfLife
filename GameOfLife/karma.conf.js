module.exports = function (config) { // jshint ignore:line
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['qunit', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
         'karmaRequireAndStart.js',
         { pattern: 'BuildOutput/**/*.js', included: false }
        ],

        // list of files to exclude
        exclude: [
            'BuildOutput/main.js',
            'BuildOutput/Interface.js', 
            'BuildOutput/Imports/RequireJS/*.*',
            'BuildOutput/Imports/QUnit/*.*'
        ],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};