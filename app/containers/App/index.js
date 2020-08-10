import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';


import SpaceDetailCard from 'core/components/SpaceDetailCard';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { FETCH_SPACEX_LIST, HEADER_HEADING, DEVELOPER_NAME, UPDATE_LOADING_STATE } from './constants';

import FilterComponent from './FilterComponent';

import { getSpacexListSelector, getLoadingSelector } from './selectors';

import './main.scss';


const App = () => {
  const dispatch = useDispatch();

  const spacexList = useSelector(getSpacexListSelector);
  const isLoading = useSelector(getLoadingSelector);

  useEffect(() => {
    dispatch({
      type: FETCH_SPACEX_LIST,
      payload: {
        limit: 20,
      },
      callback: () => {
        dispatch({
          type: UPDATE_LOADING_STATE,
          payload: false,
        });
      },
    });
  }, []);

  const renderSpacexList = () => {
    if (isLoading) {
      return new Array(6).fill().map((index) => (
        <div key={index} className="spacex__container">
          <SpaceDetailCard detail={{}} />
        </div>
      ));
    }

    return (
      spacexList.map((space) => (
        <div key={space.flight_number} className="spacex-detail-card">
          <SpaceDetailCard detail={space} />
        </div>
      ))
    );
  };

  return (
    <div className="u-height__full app__root">
      <div className="spacex--heading">{HEADER_HEADING}</div>
      <div className="app__content">
        {/* for filter the spacex list */}
        <div className="filter__container">
          <FilterComponent />
        </div>
        {/* for render the spacex list */}
        <div className="spacex__container">
          {renderSpacexList()}
        </div>
      </div>
      {/* footer component */}
      <div className="spacex__footer">
        <span className="footer__label">Developed By:</span>
        <span className="footer__value">{DEVELOPER_NAME}</span>
      </div>
    </div>
  );
};

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withReducer,
  withSaga,
)(App);
