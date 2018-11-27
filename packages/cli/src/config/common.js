const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const { getMergedLoadersConfig } = require('@malmo/cli-utils');
const loadersConfig = require('./loaders');

module.exports = () => {
  const {
    appRootNodeModules,
    assets,
    bootstrapExpressApp,
    common,
    customConstants,
    src,
    loaderConfigPath,
    malmoCliNodeModules,
    modernizr,
    publicPath,
    pwdNodeModules,
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
          include: assets,
          use: {
            loader: 'file-loader',
            options: file,
          },
        },
        {
          test: /\.(js|jsx)$/,
          include: [
            src,
            `${pwdNodeModules}/@malmo`,
          ],
          use: {
            loader: 'babel-loader',
            options: js,
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
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        name: 'vendors',
      },
    },
  };

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
