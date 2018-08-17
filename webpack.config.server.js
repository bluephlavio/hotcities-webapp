const path = require('path');
const nodeExternals = require('webpack-node-externals');

const CWD = process.cwd();

const config = {
  name: 'server',
  target: 'node',
  node: {
    __dirname: true,
  },
  externals: [nodeExternals()],
  entry: [
    path.join(CWD, 'server', 'index.js'),
  ],
  output: {
    path: path.join(CWD, 'dist', 'server'),
    filename: 'server.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
};

module.exports = config;
