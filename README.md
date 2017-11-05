# gulp-powcss

A PowCSS(^1.0.5) plugin for Gulp

## install

```js
yarn add gulp-powcss
```

## usage

```js
let
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  powcss = require('gulp-powcss');

gulp.src('./path/*.css')
.pipe(
  powcss(/*plugins*/)
  // use default powcss/lib/context
  .runToCSS('ctx,param...',[null,...args])
  // or customize your context
  // .runToCSS('ctx,param...',[yourcontext(),...args])
)
.pipe(concat('all.css'))
.pipe(gulp.dest('dist'))
```

## License

MIT License <https://github.com/powjs/gulp-powcss/blob/master/LICENSE>
