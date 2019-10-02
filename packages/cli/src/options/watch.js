const { watchFiles } = require('@malmo/cli-utils');
const dev = require('../commands/dev');

module.exports = async () => {
  const {
    configPath,
    webpackConfigPath,
    loadersConfigPath,
    pluginsConfigPath,
    expressConfigPath,
    browserListConfigPath,
  } = require('../modules/configuration')();

  watchFiles({
    files: [
      configPath,
      webpackConfigPath,
      loadersConfigPath,
      pluginsConfigPath,
      expressConfigPath,
      browserListConfigPath,
    ].filter(Boolean),
    callback: dev,
  });
};
