const webpack = require('webpack');
const merge = require('webpack-merge');
const { getMergedConfig } = require('@malmo/cli-utils');
const commonConfig = require('./common');
const loadersConfig = require('./loaders');

module.exports = () => {
  process.env.SERVER = true;

  const {
    customConstants,
    dist,
    emptyModule,
    expressConfigPath,
    loadersConfigPath,
    modernizr,
    pwdNodeModules,
    serverEntry,
    serverRender,
    webpackConfigPath,
  } = require('../constants');

  const {
    css,
    cssNodeModules,
    scss,
    postcss,
    postcssNodeModules,
  } = getMergedConfig({
    baseConfig: loadersConfig(customConstants),
    configPath: loadersConfigPath,
    params: customConstants,
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
          exclude: pwdNodeModules,
          use: [
            {
              loader: 'css-loader/locals',
              options: css,
            },
            {
              loader: 'postcss-loader',
              options: postcss,
            },
          ],
        },
        {
          test: /\.(css)$/,
          include: pwdNodeModules,
          use: [
            {
              loader: 'css-loader/locals',
              options: cssNodeModules,
            },
            {
              loader: 'postcss-loader',
              options: postcssNodeModules,
            },
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

  return getMergedConfig({
    baseConfig: config,
    configPath: webpackConfigPath,
    params: customConstants,
  });
};
