const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { env } = require('./config/config');

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');

const config = {
  mode: env,
  target: 'web',
  entry: {
    client: [
      './client/index.js',
    ],
  },
  output: {
    path: path.join(DIST_DIR, 'client'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: env === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            options: {
              sourceMap: env === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
              sourceMap: env === 'development',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: env === 'development',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: env === 'development',
            },
          },
        ],
      },
      {
        test: /\.(svg|woff2?|png|eot|ttf|ico)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(ASSETS_DIR, '**/*'),
        to: path.join(DIST_DIR, 'client'),
        flatten: true,
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};

if (env === 'development') {
  config.entry.client = [
    'webpack-hot-middleware/client',
    ...config.entry.client,
  ];
  config.devtool = 'eval-source-map';
  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ];
}

if (env === 'production') {
  config.plugins = [
    new CleanWebpackPlugin(path.join('dist', 'client')),
    ...config.plugins,
  ];
}

module.exports = config;
