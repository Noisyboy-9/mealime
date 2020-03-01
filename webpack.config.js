let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // basic  webpack init
  entry: './src/js/main.js',

  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },

  // adding babel loader
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: true
        }
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html'),
      filename: 'index.html',
      minify: true
    }),

    new ExtractTextPlugin('css/[name].css')
  ],

  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
};
