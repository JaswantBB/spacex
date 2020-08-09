import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

const createRootReducer = (history, injectedReducers) => combineReducers({
  router: connectRouter(history),
  ...injectedReducers,
});

export default createRootReducer;
