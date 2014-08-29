var testFiles = [];
var TEST_REGEXP = /_test\.js$/i;

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        testFiles.push(file);
    }
});

require.config({ // jshint ignore:line
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/BuildOutput',

    deps: testFiles,

    // we have to kickoff qunit, as it is asynchronous
    callback: window.__karma__.start
});
