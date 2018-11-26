/* global CONSTANTS */
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import createAxiosInstance from './axios';

/* eslint-disable no-underscore-dangle */
const initialState = global.__DATA__ || {};
const reduxDevTools = global.__REDUX_DEVTOOLS_EXTENSION__;
/* eslint-enable no-underscore-dangle */

export default ({ apiBaseUrl = CONSTANTS.apiBaseUrl } = {}) => {
  const api = createAxiosInstance({ apiBaseUrl });
  const composeElements = [applyMiddleware(thunkMiddleware.withExtraArgument(api))];

  if (
    process.env.NODE_ENV !== 'production'
    && reduxDevTools
  ) {
    composeElements.push(reduxDevTools());
  }

  return createStore(reducers, initialState, compose(...composeElements));
};
