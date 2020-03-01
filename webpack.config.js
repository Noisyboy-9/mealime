let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // basic  webpack init
  entry: './src/js/main.js',

  mode: 'production',

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
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader'],
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader' , 'sass-loader']
        })
      },
      {
        test: /\.(ttf|woff2?)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath:'sass/vendors/fonts',
            publicPath:'assest/fonts'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath:'images',
            publicPath:'assest/image'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname , 'src/index.html')
    }),
    new ExtractTextPlugin('css/[name].css'),
  ]
};
