const express = require('express');
const { openBrowser, getMergedConfig } = require('@malmo/cli-utils');
const { preServerRender, postServerRender } = require('../middleware');

module.exports = async () => {
  process.env.NODE_ENV = 'development';

  const configuration = require('../modules/configuration')();

  const {
    port,
    root,
    projectType,
    expressConfigPath,
    ...customConstants
  } = configuration;

  const expressConfig = getMergedConfig({ configPath: expressConfigPath });

  const defaults = [require('../defaults/client.hmr')(configuration)];
  if (projectType === 'ssr') {
    defaults.push(require('../defaults/server')(configuration));
  }

  const {
    router,
    devMiddleware,
  } = await require('../modules/compilation')(defaults, configuration);

  let app = express();

  if (typeof (expressConfig) === 'function') {
    app = expressConfig(app, customConstants);
  }

  app = preServerRender(app);

  app.use(router);

  app = postServerRender(app);

  const appInstance = await app.listen(port, openBrowser.bind(null, root));

  return () => {
    appInstance.close();
    devMiddleware.close();
    process.stdout.write('\x1Bc\x1B[3J');
  };
};
