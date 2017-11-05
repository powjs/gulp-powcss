let
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  clean = require('gulp-clean-dest'),
  concat = require('gulp-concat'),
  powcss = require('../');

let expected = `a {
color: #f00;
}

b {
color: #0f0;
}`;

gulp.task('default', function () {
  return gulp.src('./fixtures/*.css')
  .pipe(powcss([]).runToCSS('ctx, color', [null, function (c) {
    return c == 'red' && '#f00' || '#0f0';
  },]))
  .pipe(concat('actual.css'))
  .pipe(gulp.dest(function (file) {
    let actual = file.contents.toString().trim();
    if (actual === expected)
      gutil.log('Ok');
    else {
      gutil.log('fail', actual);
      throw new gulpUtil.PluginError('gulp-powcss', 'not equal');
    }
    return '';
  }))
  .pipe(clean(''));
});
