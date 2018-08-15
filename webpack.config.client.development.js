const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CWD = process.cwd();

module.exports = {
  name: 'client',
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.join(CWD, 'client', 'src', 'index.js'),
  ],
  output: {
    filename: 'client.bundle.js',
    path: path.join(CWD, 'client', 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.(jpe?g|gif|png|ico|svg|eot|woff2?|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(CWD, 'client', 'src', 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
