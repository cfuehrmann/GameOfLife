module.exports = function (config) {

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
            "BuildOutput/Main.js",
            "BuildOutput/Interface.js",
            "BuildOutput/Imports/RequireJS/*.*",
            "BuildOutput/Imports/QUnit/*.*"
        ],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // This setting has been moved into the gruntfile
        browsers: ["Chrome"],

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