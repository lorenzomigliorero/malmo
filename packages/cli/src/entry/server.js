/* global clientStats */
import path from 'path';
import express from 'express';
import expressConfig from 'express-config';
import serverRender from 'server-render';

import {
  bootstrapExpressApp,
  staticFolder,
} from '@/constants';

import {
  preServerRender,
  postServerRender,
} from '../middleware';

let app = express();

if (typeof (expressConfig) === 'function') {
  app = expressConfig(app);
}

app = preServerRender(app);

app
  .use(express.static(path.join(__dirname, staticFolder)))
  .use(serverRender({ clientStats }));

app = postServerRender(app);

if (bootstrapExpressApp) {
  app.listen(process.env.PORT, () => console.log(`Express server run on port ${process.env.PORT}`));
}

const exportedApp = app;

export default exportedApp;
