/*global require:false*/

var gulp = require('gulp');
var remove = require('gulp-rimraf');
var transpile = require('gulp-tsc');
var test = require('gulp-karma');

gulp.task('default', ['runtests'], function () {
});

gulp.task('transpile', function () {
    return gulp.src(["main.ts", "Implementation_test_ArrayScene.ts"])
      .pipe(transpile({ emitError: false, noImplicitAny: true, module: "amd" }))
      .pipe(gulp.dest('BuildOutput/'));
});

gulp.task('removeImports', function () {
    return gulp.src('./BuildOutput/Imports')
        .pipe(remove());
});

gulp.task('copyImports', ['removeImports'], function () {
    return gulp.src('./Imports/**/*.js')
        .pipe(gulp.dest('./BuildOutput/Imports'));
});

gulp.task('copyHtml', function () {
    return gulp.src('./index.html').
        pipe(gulp.dest('./BuildOutput'));
});

gulp.task('runtests', ['transpile', 'copyImports', 'copyHtml'], function () {
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
