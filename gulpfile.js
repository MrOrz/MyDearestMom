var gulp = require('gulp'),
    webpack = require('webpack'),
    webpackCfg = require('./config/webpack'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    WebpackDevServer = require('webpack-dev-server');

// Webpack compiler & its config.
//
var compiler = webpack(webpackCfg),
    webpackStats;

// Runs webpack compiler and generates javascript files.
//
gulp.task('webpackCompile', function(cb){
  compiler.run(function(err, stats){
    if(err){
      throw new gutil.PluginError('webpack', err)
    }
    gutil.log('[webpack]', ""+stats);

    webpackStats = stats;
    cb();
  });
});

// Starts a Webpack dev server, which watch file changes,
// re-compiles in memory (so no actual file is generated) and reloads the browser
// as needed.
//
gulp.task('devServer', function(cb){
  new WebpackDevServer(compiler, {
    contentBase: './',
    publicPath: '/assets/'
  }).listen(8080, "0.0.0.0", function(err){
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});

// Jade compilation
//
gulp.task('jade', function(){
  return gulp.src('src/jade/index.jade')
    .pipe(jade({
      pretty: true,
      locals: {
        hash: 'main'
      }
    }))
    .pipe(gulp.dest('./'));
});

// Jade compilation with webpack compilation stats
//
gulp.task('jadeProduction', ['webpackCompile'], function(){
  return gulp.src('src/jade/index.jade')
    .pipe(jade({
      pretty: false,
      locals: webpackStats
    }))
    .pipe(gulp.dest('./'));
})

// Watch file change and invoke corresponding compilers.
//
// Note: This task has nothing to do with browser reload.
//       Browser reload setup is in config/webpack.js.
//
gulp.task('watch', ['jade'], function(cb){
  gulp.watch('./src/jade/*', ['jade']);
});

gulp.task('default', ['watch', 'devServer']);

gulp.task('build', process.env.NODE_ENV==='production' ?
  ['jadeProduction'] : ['webpackCompile', 'jade']);