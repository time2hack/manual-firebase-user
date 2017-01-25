var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package')

var config = {
  entry: {
    app: './src/js/script.js',
    vendor: Object.keys(pkg.dependencies),
  },
  output: {
    path: './public/js',
    filename: 'app.bundle.js'
  },
  devServer: {
    port: 3333,
    contentBase: path.join(__dirname, 'public'),
    colors: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
      new HtmlWebpackPlugin({
        filename: '../index.html',
        template: 'src/html/index.html'
      }),
      new HtmlWebpackPlugin({
        filename: '../login.html',
        template: 'src/html/login.html'
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity),
      new webpack.ProvidePlugin({
        $: "jquery"
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),

      // expose the environment to the front end
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
  ]
};

module.exports = config;
