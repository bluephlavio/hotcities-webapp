const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CWD = process.cwd();

module.exports = {
  name: 'client',
  target: 'web',
  mode: 'production',
  entry: [
    'babel-polyfill',
    path.join(CWD, 'client', 'src', 'index.js'),
  ],
  output: {
    filename: 'client.bundle.js',
    path: path.join(CWD, 'dist', 'client'),
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
        test: /\.(jpe?g|gif|png|eot|svg|woff2?|ttf)$/,
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
  ],
};
