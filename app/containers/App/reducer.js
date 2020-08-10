import { fromJS } from 'immutable';

import { SPACEX_LIST_FETCHED, SET_LOADING_STATE, UPDATE_LOADING_STATE } from './constants';

// The initial state of the App
const initialState = fromJS({
  spacexList: [],
  isLoading: true,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SPACEX_LIST_FETCHED:
      return state.set('spacexList', action.response);
    case SET_LOADING_STATE:
      return state.set('isLoading', action.payload);
    case UPDATE_LOADING_STATE:
      return state.set('isLoading', action.payload);
    default:
      return state;
  }
}

export default appReducer;
