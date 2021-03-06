const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./common');

module.exports = (constants) => {
  process.env.SERVER = true;

  const {
    dist,
    emptyModule,
    expressConfigPath,
    modernizr,
    pwdNodeModules,
    serverEntry,
    serverRender,
    getLoadersConfig,
    getPluginsConfig,
    getWebpackConfig,
  } = constants;

  const pluginsConfig = getPluginsConfig();

  const loadersConfig = getLoadersConfig();

  const {
    css,
    cssNodeModules,
    scss,
    postcss,
    postcssNodeModules,
  } = loadersConfig;

  let config = commonConfig({
    pluginsConfig,
    loadersConfig,
    ...constants,
  });

  config = merge(config, {
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
          test: /\.css$/,
          exclude: pwdNodeModules,
          use: [
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

  return getWebpackConfig(config);
};
