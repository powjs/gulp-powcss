let path           = require('path');
let powcss         = require('powcss');
let context        = require('powcss/lib/context');
let through2       = require('through2');
let gutil          = require('gulp-util');

let PluginError    = gutil.PluginError;
let methods = 'open,close,name,reset,walk,toCSS'.split(',');

// isolate
function runToCSS(params, args) {
  let ctx, pow = this.pow;

  if (params || args) {
    if (typeof params !== 'string')
      throw new Error('params must be a string or null');

    if (!Array.isArray(args) || !args.length)
      throw new Error('args must be an non-empty array or null');

    ctx = args[0];

    if (ctx == null)
      ctx = args[0] = context();
    else {
      if (!methods.every((method) => {
        return typeof ctx[method] === 'function';
      }))
        throw new Error('args[0] must be null or a instance of powcss/lib/context');
    }

  }else {
    args = 'ctx';
    params = [context()];
  }

  return through2.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError('gulp-powcss', 'Streaming not supported'));
    }

    ctx.reset();

    file.contents = new Buffer(
      pow.run(file.contents.toString(), params, args).toCSS()
    );
    cb(null, file);
  });
}

module.exports = function (plugins) {

  return {
    runToCSS: runToCSS,
    pow: powcss(plugins),
  };
};
