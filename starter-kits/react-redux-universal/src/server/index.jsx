import { Provider } from 'react-redux';
import { matchPath, StaticRouter as Router } from 'react-router-dom';
import React from 'react';
import { renderToString } from 'react-dom/server';
import flushChunks from 'webpack-flush-chunks';
import createReduxStore from '@/store/create';
import App from '@/containers/App';
import routes from '@/router/routes';

export default ({ clientStats }) => async (req, res) => {
  const store = createReduxStore();

  const promises = [];

  routes.some((route) => {
    const match = matchPath(req.url, route);

    if (
      match
      && route.fetchData
    ) {
      promises.push(route.fetchData({
        params: match.params,
        dispatch: store.dispatch,
      }));
    }

    return match;
  });

  await Promise.all(promises);

  const context = {};

  const markup = renderToString(
    <Provider store={store}>
      <Router
        location={req.url}
        context={context}
      >
        <App />
      </Router>
    </Provider>,
  );

  const {
    url,
    status,
  } = context;

  const {
    js,
    styles,
  } = flushChunks(clientStats, {
    before: ['bootstrap'],
    chunkNames: [],
  });

  if (status && url) {
    res.redirect(status, url);
  } else {
    res.status(status || 200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
          ${styles.toString()}
        </head>
        <body>
          <main id="app-root">${markup}</main>
          <script>window.__DATA__ = ${JSON.stringify(store.getState())}</script>
          ${js.toString()}
        </body>
      </html>
    `.trim());
  }
  res.end();
};
