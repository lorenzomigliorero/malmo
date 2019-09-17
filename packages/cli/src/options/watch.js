const { watchFiles } = require('@malmo/cli-utils');
const dev = require('../commands/dev');

module.exports = async () => {
  const {
    configPath,
    webpackConfigPath,
    loadersConfigPath,
    pluginsConfigPath,
    expressConfigPath,
  } = require('../modules/configuration')();

  watchFiles({
    files: [
      configPath,
      webpackConfigPath,
      loadersConfigPath,
      pluginsConfigPath,
      expressConfigPath,
    ].filter(Boolean),
    callback: dev,
  });
};
