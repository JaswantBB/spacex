import { fromJS } from 'immutable';

import { SPACEX_LIST_FETCHED } from './constants';

// The initial state of the App
const initialState = fromJS({
  spacexList: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SPACEX_LIST_FETCHED:
      return state.set('spacexList', action.response);
    default:
      return state;
  }
}

export default appReducer;
