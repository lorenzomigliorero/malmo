const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { omit } = require('lodash');
const merge = require('webpack-merge');
const path = require('path');
const {
  getIncludeArrayFromLoaderOption,
  getMergedConfig,
} = require('@malmo/cli-utils');
const loadersConfig = require('./loaders');
const pluginsConfig = require('./plugins');

module.exports = () => {
  const {
    appRootNodeModules,
    assets,
    bootstrapExpressApp,
    common,
    customConstants,
    expressStaticFolder,
    loadersConfigPath,
    pluginsConfigPath,
    malmoCliNodeModules,
    modernizr,
    port,
    projectType,
    publicPath,
    pwdNodeModules,
    root,
    src,
  } = require('../constants');

  const { file, js } = getMergedConfig({
    baseConfig: loadersConfig(customConstants),
    configPath: loadersConfigPath,
    params: customConstants,
  });

  const { uglifyJsPlugin } = getMergedConfig({
    baseConfig: pluginsConfig(customConstants),
    configPath: pluginsConfigPath,
    params: customConstants,
  });

  let config = {
    output: { publicPath },
    mode: process.env.NODE_ENV,
    module: {
      rules: [
        {
          include: [
            assets,
            ...getIncludeArrayFromLoaderOption(file),
          ],
          use: {
            loader: 'file-loader',
            options: omit(file, 'include'),
          },
        },
        {
          test: /\.(js|jsx)$/,
          include: [
            src,
            path.join(pwdNodeModules, '@malmo'),
            ...getIncludeArrayFromLoaderOption(js),
          ],
          use: {
            loader: 'babel-loader',
            options: omit(js, 'include'),
          },
        },
      ],
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.scss',
      ],
      alias: { '@': common },
      modules: [
        pwdNodeModules,
        appRootNodeModules,
        malmoCliNodeModules,
      ],
    },
    resolveLoader: {
      modules: [
        pwdNodeModules,
        appRootNodeModules,
        malmoCliNodeModules,
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin(['NODE_ENV', 'IP', process.env.NODE_ENV === 'development' ? 'PORT' : undefined].filter(Boolean)),
      new webpack.DefinePlugin({
        CONSTANTS: JSON.stringify({
          bootstrapExpressApp,
          expressStaticFolder,
          port,
          publicPath,
          root,
          ...customConstants,
        }),
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };

  if (projectType !== 'library') {
    config = merge(config, {
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          name: 'vendors',
        },
      },
    });
  }

  if (modernizr) {
    config = merge(config, {
      module: {
        rules: [
          {
            loader: 'webpack-modernizr-loader',
            test: /\.modernizrrc\.js$/,
          },
        ],
      },
    });
  }

  if (process.env.NODE_ENV === 'production') {
    config = merge(config, {
      performance: { hints: false },
      optimization: {
        minimizer: [
          new UglifyJsPlugin(uglifyJsPlugin),
        ],
      },
    });
  }
  return config;
};
