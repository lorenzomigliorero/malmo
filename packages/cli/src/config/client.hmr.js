const webpack = require('webpack');
const merge = require('webpack-merge');
const clientConfig = require('./client');

module.exports = () => {
  const config = merge(clientConfig(), {
    entry: {
      main: [
        'webpack-hot-middleware/client',
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  });

  return config;
};
