const Webpack = require('webpack');
const path = require('path');
const appPath = path.resolve(__dirname, 'client','app');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'dist', 'build');

const config = {
  context: __dirname,
  devtool: 'eval-source-map',
  entry: [
    'webpack/hot/dev-server',
    path.resolve(appPath, 'main.js')],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve : {

  },
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: [nodeModulesPath],
      query: {
        optional: ['runtime'],
        stage: 0
      },
    },
    { test: /\.css/, loader: "style-loader!css-loader" },
    { test: /\.png/, loader: "url-loader?limit=100000&mimetype=image/png" },
    { test: /\.woff/, loader: "url-loader?limit=100000"},
    { test: /\.woff2/, loader: "url-loader?limit=100000"},
    { test: /\.ttf/, loader: "file-loader"},
    { test: /\.eot/, loader: "file-loader"}
    ]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
