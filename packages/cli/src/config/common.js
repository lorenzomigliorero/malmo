const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { omit } = require('lodash');
const merge = require('webpack-merge');
const path = require('path');
const {
  getIncludeArrayFromLoaderOption,
  getMergedLoadersConfig,
} = require('@malmo/cli-utils');
const loadersConfig = require('./loaders');

module.exports = () => {
  const {
    appRootNodeModules,
    assets,
    bootstrapExpressApp,
    common,
    customConstants,
    loaderConfigPath,
    malmoCliNodeModules,
    modernizr,
    projectType,
    publicPath,
    pwdNodeModules,
    src,
    staticFolder,
  } = require('../constants');

  const { file, js } = getMergedLoadersConfig({
    config: loadersConfig,
    loaderConfigPath,
    customConstants,
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
      new webpack.EnvironmentPlugin(['NODE_ENV', 'PORT', 'IP']),
      new webpack.DefinePlugin({
        CONSTANTS: JSON.stringify({
          bootstrapExpressApp,
          publicPath,
          staticFolder,
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
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: {
                warnings: false,
                conditionals: true,
                reduce_vars: false,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                join_vars: true,
                if_return: true,
              },
              output: { comments: false },
            },
          }),
        ],
      },
    });
  }
  return config;
};
