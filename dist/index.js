const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config.js');

module.exports = function () {
  let bundleStart = null;
  const compiler = webpack(webpackConfig);

  compiler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  const bundler = new WebpackDevServer(compiler, {
    publicPath: '/build/',
    inline: true,
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  bundler.listen(3001, 'localhost', function () {
    console.log('Bundling project, please wait...');
  });
};
