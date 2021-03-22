// Startup point for the client side application
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Routes from './Routes';
import reducers from './reducers';
import Layout from './components/Layout/Layout';

const enhancers = [];
/* eslint-disable no-underscore-dangle */
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}
/* eslint-enable */

type appWindow = typeof window & { INITIAL_STATE: unknown };

const composedEnhancers = compose(applyMiddleware(thunk), ...enhancers);

const store = createStore(
  reducers,
  (window as appWindow).INITIAL_STATE || {},
  composedEnhancers
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>{renderRoutes(Routes)}</Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
