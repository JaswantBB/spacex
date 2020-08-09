/**
 *
 * This is the entry file for the application
 * code.
 */
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createBrowserHistory } from 'history';
import { withRouter } from 'react-router';

import App from './containers/App';

import configureStore from './configureStore';

import './core/styles/app.scss';

const initialState = {};
const history = createBrowserHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');
const LOADER_NODE = document.getElementById('loader');
const RouterApp = withRouter(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RouterApp />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
);

LOADER_NODE.remove();
