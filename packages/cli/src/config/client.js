const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const { getMergedConfig } = require('@malmo/cli-utils');
const commonConfig = require('./common');
const loadersConfig = require('./loaders');

module.exports = () => {
  const {
    client,
    customConstants,
    htmlIndex,
    loaderConfigPath,
    modernizr,
    path,
    projectType,
    pwdNodeModules,
    webpackConfigPath,
  } = require('../constants');

  const {
    css,
    cssNodeModules,
    scss,
    postcss,
    postcssNodeModules,
    cssHot,
  } = getMergedConfig({
    baseConfig: loadersConfig(customConstants),
    configPath: loaderConfigPath,
    params: customConstants,
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
          exclude: pwdNodeModules,
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
          ],
        },
        {
          test: /\.(css)$/,
          include: pwdNodeModules,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
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

  return getMergedConfig({
    baseConfig: config,
    configPath: webpackConfigPath,
    params: customConstants,
  });
};
