const webpack = require('webpack');
const merge = require('webpack-merge');
const { getMergedWebpackConfig, getMergedLoadersConfig } = require('@malmo/cli-utils');
const commonConfig = require('./common');
const loadersConfig = require('./loaders');

module.exports = () => {
  process.env.SERVER = true;

  const {
    dist,
    emptyModule,
    loaderConfigPath,
    expressConfigPath,
    serverRender,
    modernizr,
    serverEntry,
    webpackConfigPath,
    customConstants,
  } = require('../constants');

  const { css, scss, postcss } = getMergedLoadersConfig({
    config: loadersConfig,
    loaderConfigPath,
    customConstants,
  });

  let config = merge(commonConfig(), {
    name: 'server',
    entry: process.env.NODE_ENV === 'development' ? serverRender : serverEntry,
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    output: {
      path: dist,
      filename: 'server.js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'css-loader/locals',
              options: css,
            },
            {
              loader: 'postcss-loader',
              options: postcss,
            },
            {
              loader: 'sass-loader',
              options: scss,
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'css-loader',
          ],
        },
      ],
    },
    externals: [
      'express',
    ],
    plugins: [
      new webpack.EnvironmentPlugin(['SERVER']),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
    resolve: { alias: { 'server-render': serverRender } },
  });

  if (expressConfigPath) {
    config = merge(config, { resolve: { alias: { 'express-config': expressConfigPath } } });
  }

  if (modernizr) {
    config = merge(config, {
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/\bmodernizr\b/, emptyModule),
      ],
    });
  }

  return getMergedWebpackConfig({
    config,
    webpackConfigPath,
    customConstants,
  });
};
