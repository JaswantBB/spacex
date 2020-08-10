import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { LAUNCH_YEAR, SUCCESSFUL_LAUNCH, SUCCESSFUL_LANDING, FETCH_SPACEX_LIST,
  SET_LOADING_STATE, UPDATE_LOADING_STATE } from './constants';

import './main.scss';

export const FilterButtonPills = ({ filterObj, onClick, selected, type }) => (
  <div className={`filter__button ${selected === filterObj.key ? 'active' : ''}`} onClick={() => onClick(type, filterObj)}>
    {filterObj.label}
  </div>
);

const FilterComponent = () => {
  const [filter, setFilter] = useState({});
  const [activeTab, setActiveTab] = useState('');

  const dispatch = useDispatch();

  const fetchSpacexList = (filterObj) => {
    dispatch({
      type: FETCH_SPACEX_LIST,
      payload: {
        ...filterObj,
      },
      callback: () => {
        dispatch({
          type: UPDATE_LOADING_STATE,
          payload: false,
        });
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: SET_LOADING_STATE,
      payload: true,
    });
    fetchSpacexList(filter);
  }, [filter]);

  const handleFilterChange = (key, filterObj) => {
    const currentFilterObj = { ...filter };
    setActiveTab(filterObj.key);
    setFilter({ ...currentFilterObj, [key]: filterObj.label });
  };

  return (
    <div className="filter__card__container">
      <div className="filter__heading">Filters</div>
      <div className="filter__title">Launch Year</div>
      <div className="launch__filter" >
        {
          LAUNCH_YEAR.map((yearObj, index) => (
            <FilterButtonPills key={index} filterObj={yearObj} onClick={handleFilterChange} selected={activeTab} type="launch_year" />
          ))
        }
      </div>
      <div className="filter__title">Successful Launch</div>
      <div className="launch__filter" >
        {
          SUCCESSFUL_LAUNCH.map((launchObj, index) => (
            <FilterButtonPills key={index} filterObj={launchObj} onClick={handleFilterChange} selected={activeTab} type="launch_success" />
          ))
        }
      </div>
      <div className="filter__title">Successful Landing</div>
      <div className="launch__filter" >
        {
          SUCCESSFUL_LANDING.map((landObj, index) => (
            <FilterButtonPills key={index} filterObj={landObj} onClick={handleFilterChange} selected={activeTab} type="land_success" />
          ))
        }
      </div>
    </div>
  );
};

export default FilterComponent;
