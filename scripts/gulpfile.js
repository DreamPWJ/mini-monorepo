// npm install --global gulp-cli
const gulp = require('gulp')
// const ts = require('gulp-typescript');
// const sass = require('gulp-sass');

const {series} = require('gulp')

function copy() {
  return gulp
    .src('../packages/athena-components/src/**/*.css')
    .pipe(gulp.dest('../packages/athena-components/dist'))
}

function copystyles() {
  return gulp
    .src('../packages/athena-styles/src/**')
    .pipe(gulp.dest('../packages/athena-styles/dist'))
}

function watch() {
  return gulp
    .watch(['../packages/*/src/**/*.tsx', '../packages/*/src/**/*.ts'])
    .on('change', function (file) {
      console.log('监听文件变化了:' + file.tostring())
    })
}

exports.copy = copy

exports.default = series(copy, copystyles,)
