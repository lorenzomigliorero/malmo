const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const { getMergedConfig } = require('@malmo/cli-utils');
const commonConfig = require('./common');
const loadersConfig = require('./loaders');
const pluginsConfig = require('./plugins');

module.exports = () => {
  const {
    client,
    customConstants,
    htmlIndex,
    loadersConfigPath,
    pluginsConfigPath,
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
    configPath: loadersConfigPath,
    params: customConstants,
  });

  const {
    miniCssExtractPlugin,
    htmlWebpackPlugin,
  } = getMergedConfig({
    baseConfig: pluginsConfig(customConstants),
    configPath: pluginsConfigPath,
    params: customConstants,
  });

  let config = merge(commonConfig(), {
    name: 'client',
    target: 'web',
    entry: { [projectType === 'library' ? 'index' : 'main']: [client] },
    output: {
      path,
      filename: process.env.NODE_ENV === 'development' || projectType === 'library'
        ? '[name].js'
        : '[name].[contenthash:5].js',
      chunkFilename: process.env.NODE_ENV === 'development' || projectType === 'library'
        ? '[name].js'
        : '[name].[contenthash:5].js',
    },
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
    plugins: [new MiniCssExtractPlugin(miniCssExtractPlugin)],
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
        new HtmlWebpackPlugin(htmlWebpackPlugin),
      ],
    });
  }

  return getMergedConfig({
    baseConfig: config,
    configPath: webpackConfigPath,
    params: customConstants,
  });
};
