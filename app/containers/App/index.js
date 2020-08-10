/* global config */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';


import SpaceDetailCard from 'core/components/SpaceDetailCard';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { FETCH_SPACEX_LIST, HEADER_HEADING, DEVELOPER_NAME } from './constants';

import FilterComponent from './FilterComponent';

import { getSpacexListSelector } from './selectors';

import './main.scss';


const App = () => {
  const dispatch = useDispatch();

  const spacexList = useSelector(getSpacexListSelector);

  console.log('---spacex list--', spacexList);

  useEffect(() => {
    dispatch({
      type: FETCH_SPACEX_LIST,
      payload: {
        limit: 10,
      },
    });
  }, []);

  return (
    <div className="u-height__full app__root">
      <div className="spacex--heading">{HEADER_HEADING}</div>
      <div className="app__content">
        <div className="filter__container">
          <FilterComponent />
        </div>
        <div className="spacex__container">
          {
            spacexList.map((space) => (
              <div key={space.flight_number} className="spacex-detail-card">
                <SpaceDetailCard detail={space} />
              </div>
            ))
          }
        </div>
      </div>
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
