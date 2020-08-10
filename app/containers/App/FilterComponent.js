import React, { useState } from 'react';

import { LAUNCH_YEAR, SUCCESSFUL_LAUNCH, SUCCESSFUL_LANDING } from './constants';

import './main.scss';

export const FilterButtonPills = ({ value, onClick }) => (
  <div className="filter__button" onClick={() => onClick(value)}>
    {value}
  </div>
);

const FilterComponent = () => {
  const [filter, setFilter] = useState({});

  const yearFilter = (filter) => {
    console.log('filter--', filter);
  };

  return (
    <div className="filter__card__container">
      <div className="filter__heading">Filters</div>
      <div className="filter__title">Launch Year</div>
      <div className="launch__filter" >
        {
          LAUNCH_YEAR.map((value, index) => (
            <FilterButtonPills key={index} value={value} onClick={yearFilter} />
          ))
        }
      </div>
      <div className="filter__title">Successful Launch</div>
      <div className="launch__filter" >
        {
          SUCCESSFUL_LAUNCH.map((value, index) => (
            <FilterButtonPills key={index} value={value} onClick={yearFilter} />
          ))
        }
      </div>
      <div className="filter__title">Successful Landing</div>
      <div className="launch__filter" >
        {
          SUCCESSFUL_LANDING.map((value, index) => (
            <FilterButtonPills key={index} value={value} onClick={yearFilter} />
          ))
        }
      </div>
    </div>
  );
};

export default FilterComponent;
