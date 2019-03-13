const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { env } = require('./config/config');

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const config = {
  target: 'node',
  mode: env,
  externals: [
    nodeExternals(),
  ],
  entry: {
    server: [
      './server/index.js',
    ],
  },
  output: {
    path: path.join(DIST_DIR, 'server'),
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
            loader: 'css-loader',
            options: {
              importLoader: 2,
              sourceMap: env === 'development',
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
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
  ],
};

if (env === 'development') {
  config.entry.server = [
    'webpack/hot/poll?1000',
    ...config.entry.server,
  ];
  config.externals = [
    nodeExternals({
      whitelist: [
        'webpack/hot/poll?1000',
      ],
    }),
  ];
  const styleRule = _.find(config.module.rules, rule => String(rule.test) === String(/\.s?css$/));
  styleRule.use = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    ...styleRule.use,
  ];
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: './../client/style.css',
    }),
    ...config.plugins,
  ];
  config.devtool = 'source-map';
  config.output.sourceMapFilename = `${config.output.filename}.map`;
}

if (env === 'production') {
  config.plugins = [
    new CleanWebpackPlugin(path.join('dist', 'server')),
    ...config.plugins,
  ];
}

module.exports = config;
