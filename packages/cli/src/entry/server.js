/* global CONSTANTS clientStats */
import path from 'path';
import Express from 'express';
import expressConfig from 'express-config';
import serverRender from 'server-render';

import {
  preServerRender,
  postServerRender,
} from '../middleware';

const {
  bootstrapExpressApp,
  expressStaticFolder,
  port,
} = CONSTANTS;

let app = Express();

if (typeof (expressConfig) === 'function') {
  app = expressConfig(app, CONSTANTS);
}

app = preServerRender(app);

app
  .use(Express.static(path.join(__dirname, expressStaticFolder)))
  .use(serverRender({ clientStats: clientStats })); // eslint-disable-line

app = postServerRender(app);

if (bootstrapExpressApp) {
  app.listen(process.env.PORT || port, () => console.log(`Express server run on port ${process.env.PORT || port}`));
}

const exportedApp = app;

export default exportedApp;
