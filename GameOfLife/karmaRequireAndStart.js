var testRegExp = /_test\.js$/i;
var allFiles = Object.keys(window.__karma__.files);
var testFiles = allFiles.filter(function (file) { return testRegExp.test(file); });

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: "/base/BuildOutput",

    deps: testFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
