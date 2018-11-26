import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createReduxStore from '@/store/create';
import App from '@/containers/App';

import '@/styles';

const store = createReduxStore();

const renderComponent = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

hydrate(renderComponent(), global.document.getElementById('app-root'));

if (module.hot) {
  module.hot.accept('@/containers/App', () => hydrate(renderComponent(), global.document.getElementById('app-root')));
  module.hot.accept('@/store/reducers', () => store.replaceReducer(require('@/store/reducers').default)); // eslint-disable-line global-require
}
