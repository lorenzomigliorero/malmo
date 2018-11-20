const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const {
  getMergedWebpackConfig,
  getMergedLoadersConfig,
} = require('@malmo/cli-utils');
const commonConfig = require('./common');
const loadersConfig = require('./loaders');

module.exports = () => {
  const {
    customConstants,
    webpackConfigPath,
    loaderConfigPath,
    modernizr,
    path,
    client,
    projectType,
    htmlIndex,
  } = require('../constants');

  const { css, scss, postcss, cssHot } = getMergedLoadersConfig({
    config: loadersConfig,
    loaderConfigPath,
    customConstants,
  });

  let config = merge(commonConfig(), {
    name: 'client',
    target: 'web',
    entry: { [projectType === 'library' ? 'index' : 'main']: [client] },
    output: { path },
    module: {
      rules: [
        {
          test: /\.(scss)$/,
          use: [
            {
              loader: 'css-hot-loader',
              options: cssHot,
            },
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
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
          test: /\.(css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
      ],
    },
  });

  if (modernizr) {
    config = merge(config, { resolve: { alias: { modernizr$: modernizr } } });
  }

  if (projectType !== 'library') {
    config = merge(config, { optimization: { runtimeChunk: { name: 'bootstrap' } } });
  }

  if (htmlIndex) {
    config = merge(config, {
      plugins: [
        new HtmlWebpackPlugin({ template: htmlIndex }),
      ],
    });
  }

  if (process.env.NODE_ENV === 'development' || projectType === 'library') {
    config = merge(config, {
      output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
      },
      plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],
    });
  } else {
    config = merge(config, {
      output: {
        filename: '[name].[contenthash:5].js',
        chunkFilename: '[name].[contenthash:5].js',
      },
      plugins: [
        new MiniCssExtractPlugin({ filename: '[name].[contenthash:5].css' }),
      ],
    });
  }

  return getMergedWebpackConfig({
    config,
    webpackConfigPath,
    customConstants,
  });
};
