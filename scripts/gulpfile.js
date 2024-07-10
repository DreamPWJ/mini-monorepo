// npm install --global gulp-cli
const gulp = require('gulp')

const { series } = require('gulp')

function copy() {
  return gulp
    .src('../packages/athena-components/src/**/*.css')
    .pipe(gulp.dest('../packages/athena-components/dist'))
}

function copyStyles() {
  return gulp
    .src('../packages/athena-styles/src/**')
    .pipe(gulp.dest('../packages/athena-styles/dist'))
}

exports.default = series(copy)
