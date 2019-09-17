module.exports = {
  configExpressFileName: 'malmo.express-config.js',
  configFileName: 'malmo.config.js',
  configPluginsFileName: 'malmo.plugins-config.js',
  configLoadersFileName: 'malmo.loaders-config.js',
  configWebpackFileName: 'malmo.webpack-config.js',
};

module.exports.aliasDependencies = [
  'express',
  'modernizr',
  'html-webpack-plugin',
  'mini-css-extract-plugin',
  'uglifyjs-webpack-plugin',
  'webpack',
  'webpack-merge',
];
