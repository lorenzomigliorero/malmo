const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./common');

module.exports = (constants) => {
  delete process.env.SERVER;

  const {
    client,
    htmlIndex,
    modernizr,
    path,
    projectType,
    pwdNodeModules,
    getPluginsConfig,
    getLoadersConfig,
    getWebpackConfig,
  } = constants;

  const pluginsConfig = getPluginsConfig();

  const {
    miniCssExtractPlugin,
    htmlWebpackPlugin,
  } = pluginsConfig;

  const loadersConfig = getLoadersConfig();

  const {
    css,
    cssNodeModules,
    scss,
    postcss,
    postcssNodeModules,
    cssHot,
  } = loadersConfig;

  let config = commonConfig({
    pluginsConfig,
    loadersConfig,
    ...constants,
  });

  config = merge(config, {
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
            Object.prototype.toString.apply(postcss) === '[object Object]' ? {
              loader: 'postcss-loader',
              options: postcss,
            } : undefined,
            {
              loader: 'sass-loader',
              options: scss,
            },
          ].filter(Boolean),
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
            Object.prototype.toString.apply(postcss) === '[object Object]' ? {
              loader: 'postcss-loader',
              options: postcss,
            } : undefined,
          ].filter(Boolean),
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
            Object.prototype.toString.apply(postcssNodeModules) === '[object Object]' ? {
              loader: 'postcss-loader',
              options: postcssNodeModules,
            } : undefined,
          ].filter(Boolean),
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

  return getWebpackConfig(config);
};
