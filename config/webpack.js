var webpack = require('webpack'),
    ExtractText = require('extract-text-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production'

// Base config
//
var webpackCfg = {
  entry: {
    'main': './src/js/main.js',
  },
  output: {
    path: (isProduction ? '.' : __dirname) + '/assets',
    filename: ( isProduction ? '[hash].js' : 'main.js')
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractText.extract("css?sourceMap!stylus")
      },{
        test: /\.(?:jpg)|(?:png)$/, loader: "file-loader"
      }
    ],
  },
  plugins: [
    new ExtractText( isProduction ? "[hash].css" : "main.css" )
  ],
  debug: !isProduction
};

// Extra plugin definitions

// Watch files that is not required with webpack
// https://github.com/webpack/webpack-dev-server/issues/34
//
function WatchExternalFilesPlugin() {}
WatchExternalFilesPlugin.prototype.apply = function(compiler) {
  compiler.plugin("after-compile", function(compilation, callback) {
    compilation.fileDependencies.push("index.html");
    callback();
  });
};


// Other env-based configs
//
if( isProduction ){
  webpackCfg.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false
  }));
}else{
  webpackCfg.plugins.push(new WatchExternalFilesPlugin());
  webpackCfg.devtool = '#source-map'
}

module.exports = webpackCfg;