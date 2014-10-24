﻿/*global require:false*/

var gulp = require('gulp');
var transpile = require('gulp-tsc');
var test = require('gulp-karma');
var exec = require('child_process').exec;
var tslint = require('gulp-tslint');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var remove = require('gulp-rimraf');

gulp.task('default', ['runtests'], function () {
});

gulp.task('runtests', ['transpile', 'copyImports', 'copyHtml'], function () {
    return gulp.src('BuildOutput/*_test_*.js')
      .pipe(test({ configFile: 'karma.conf.js', action: 'run' }))
      .on('error', function (err) {
          // Make sure failed tests cause gulp to exit non-zero
          throw err;
      });
});

// Concerning incremental build: when called on a single file, tsc also builds the dependencies! 
// (Maybe this is different without requirejs, but currently we use requirejs.) Plus, the time spent 
// by tsc turns out to be mostly startup time! So, unless we find a way to make tsc compile single
// files, we achieve the fastest build by calling tsc only once, with all required ts files as arguments.
// There should be a more elegant way to achieve this than below. But since we replace msbuild by
// grunt or gulp soon, we defer the required change.

gulp.task('transpile', ['tslint', 'jscs', 'jshint'], function () {
    return gulp.src(["main.ts", "Implementation_test_ArrayScene.ts"])
        .pipe(transpile({ emitError: false, noImplicitAny: true, module: "amd" }))
        .pipe(gulp.dest('BuildOutput/'));
});

gulp.task('jscs', function () {
    return gulp.src('*.js')
        .pipe(jscs());
});

gulp.task('tslint', function () {
    gulp.src("*.ts")
      .pipe(tslint())
      .pipe(tslint.report('verbose'));
});

gulp.task('jshint', function () {
    return gulp.src('*.js')
        .pipe(jshint())
      .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('copyImports', ['removeImports'], function () {
    return gulp.src('./Imports/**/*.js')
        .pipe(gulp.dest('./BuildOutput/Imports'));
});

gulp.task('copyHtml', function () {
    return gulp.src('./index.html').
        pipe(gulp.dest('./BuildOutput'));
});

gulp.task('removeImports', function () {
    return gulp.src('./BuildOutput/Imports')
        .pipe(remove());
});

// Before committing to source control, we want to ensure that the tests do not succeed only due to 
// files that are not committed. To remove files that are not committed, we use the target "SourceClean".
// However, we want to be sure that we do not remove untracked files by accident. So we fist call
// "SourceCleanCheck" to see which files would be removed. In summary, before committing, we do this:
// (1) Run SourceCleanCheck
// (2) If SourceCleanCheck shows files we want to keep, track those
// (3) Run SourceClean 
// (4) Run the tests

gulp.task('sourceCleanCheck', function () {
    exec("git clean -n -x -d -e *.suo", execCallback);
});

gulp.task('sourceClean', function () {
    exec("git clean -f -x -d -e *.suo", execCallback);
});

function execCallback(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
}