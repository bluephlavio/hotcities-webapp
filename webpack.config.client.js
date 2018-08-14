const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client', 'src', 'index.js'),
  output: {
    filename: 'client.bundle.js',
    path: path.join(__dirname, 'dist'),
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
};
