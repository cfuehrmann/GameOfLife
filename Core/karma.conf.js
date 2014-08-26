// The module object is apparently created by karma before this code is executed. 
// It is then used below to store the config data. The exports may be used later by
// the module system to attache modules to it.
module.exports = function (config) {
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
