const webpack = require('webpack');
const merge = require('webpack-merge');
const clientConfig = require('./client');

module.exports = () => {
  const { publicPath } = require('../constants');
  const config = merge(clientConfig(), {
    entry: { main: [`webpack-hot-middleware/client?path=${publicPath}__webpack_hmr`] },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });

  return config;
};
