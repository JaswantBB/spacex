import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import responseMiddleware from 'utils/responseMiddleware';

import createRootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState, history) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    responseMiddleware,
  ];

  const store = createStore(
    createRootReducer(history),
    fromJS(preloadedState),
    composeEnhancer(
      applyMiddleware(
        ...middlewares
      ),
    ),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history, store.injectedReducers));
    });
  }

  return store;
}
