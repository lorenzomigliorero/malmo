const express = require('express');
const { openBrowser } = require('@malmo/cli-utils');
const {
  preServerRender,
  postServerRender,
} = require('../middleware');

module.exports = async () => {
  process.env.NODE_ENV = 'development';

  const {
    port,
    root,
    projectType,
    expressConfigPath,
  } = require('../constants');

  const expressConfig = require(expressConfigPath);

  const { router } = await require('../scripts/compilation')([
    require('../config/client.hmr')(),
    projectType === 'ssr' ? require('../config/server')() : undefined,
  ].filter(Boolean));

  let app = express();

  if (typeof (expressConfig) === 'function') {
    app = require(expressConfigPath)(app);
  }

  app = preServerRender(app);

  app.use(router);

  app = postServerRender(app);

  app.listen(port);

  openBrowser({ url: root });
};
