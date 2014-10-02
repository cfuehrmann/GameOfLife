/*global require:false*/

var spawn = require('child_process').spawn;

var gulp = require('gulp');
var transpile = require('gulp-tsc');
var test = require('gulp-karma');

gulp.task('sourceCleanCheck', function () {
    spawn("git", ["status"]);
});

gulp.task('default', ['runtests'], function () {
});

gulp.task('runtests', ['transpile'], function () {
    return gulp.src('BuildOutput/*_test_*.ts')
      .pipe(test({
          configFile: 'karma.conf.js',
          action: 'run'
      }))
      .on('error', function (err) {
          // Make sure failed tests cause gulp to exit non-zero
          throw err;
      });
});

gulp.task('transpile', function () {
    return gulp.src(["Integers.ts", "Exceptions.ts", "Integers_test.ts", "Exceptions_test.ts"])
      .pipe(transpile({ emitError: false, noImplicitAny: true, declaration: true, module: "amd" }))
      .pipe(gulp.dest('BuildOutput/'));
});