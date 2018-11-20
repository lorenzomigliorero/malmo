module.exports = {
  configExpressFileName: 'malmo.express-config.js',
  configFileName: 'malmo.config.js',
  configLoadersFileName: 'malmo.loaders-config.js',
  configWebpackFileName: 'malmo.webpack-config.js',
};

module.exports.aliasDependencies = [
  '@babel/core',
  'express',
  'html-webpack-plugin',
  'mini-css-extract-plugin',
  'uglifyjs-webpack-plugin',
  'webpack',
  'webpack-merge',
];
