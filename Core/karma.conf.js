// The module object is apparently created by karma before this code is executed. 
// It is then used below to store the config data. The exports may be used later by
// the module system to attache modules to it.
module.exports = function (config) { // jshint ignore:line
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: ".",

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["requirejs", "qunit"],

        // list of files / patterns to load in the browser
        files: [
         "karmaRequireAndStart.js",
         { pattern: "BuildOutput/**/*.js", included: false }
        ],

        // list of files to exclude
        exclude: [

        ],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers.
        // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // This setting has been moved into the gruntfile
        // browsers: ['Chrome'], 

        phantomjsLauncher: {
            // Here we could configure the path to the PhantomJS executable for each 
            // platform. But since this file is a source, and the path is user-specific,
            // the path should be set as an environment variable, not here.
            // However, we need this "phantomjsLauncher" element, because 
            // karma-phantomjs-launcher-nonet fails without it.
            // cmd: {
            //  linux: path.join(__dirname, 'target/phantomjs/linux64/phantomjs'),
            //  darwin: path.join(__dirname, 'target/phantomjs/darwin/phantomjs'),
            //  win32: path.join(__dirname, 'target/phantomjs/win/phantomjs.exe')
            // }
        },

        reporters: ["progress", "junit"],

        junitReporter: {
            outputDir: "testResults" // results will be saved as $outputDir/$browserName.xml 
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
