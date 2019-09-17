const webpack = require('webpack');
const merge = require('webpack-merge');
const clientConfig = require('./client');

module.exports = (constants) => {
  const { publicPath } = constants;
  const config = merge(clientConfig(constants), {
    entry: { main: [`webpack-hot-middleware/client?path=${publicPath}__webpack_hmr`] },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });

  return config;
};
