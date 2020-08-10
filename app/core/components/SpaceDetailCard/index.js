import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Skeleton from 'react-loading-skeleton';

import { getLoadingSelector } from './../../../containers/App/selectors';

import './spaceDetail.scss';

export const DetailContainer = ({ label, value, isLoading }) => {
  const getValue = () => {
    if (value || value === 0 || value === false) {
      if (value === true || value === false) {
        return value ? 'true' : 'false';
      }
      return value;
    }
    return '-';
  };

  if (isLoading) {
    return (<FormSkeleton />);
  }

  return (
    <div className="detail-container" >
      <span className="detail-label">{label}:</span>
      <span className="detail-value">{getValue()}</span>
    </div>
  );
};

const FormSkeleton = () => (
  <span className="detail-label"><Skeleton width={200} height={30} /></span>
);

const SpaceDetailCard = ({ detail }) => {
  const { mission_name, flight_number, mission_id, launch_year, launch_success, launch_landing, links } = detail;

  const loading = useSelector(getLoadingSelector);

  return (
    <div className="space-detail-card">
      <div className="spacex-detail-logo">
        {loading ? <Skeleton height={250} /> : (<img src={links.mission_patch_small} alt={'Spacex_logo'} className="logo__icon" />)}
      </div>
      {!loading && (<div className="space-detail-heading">{mission_name} #{flight_number}</div>)}
      <div className="spacex-detail-mission">
        {!loading && (<Fragment><div className="detail-label">Mission Ids:</div>
          <div className="detail-value">
            <ul className="text-list">
              {mission_id.length ? mission_id.map((value, index) => <li key={`${value} ${index}`}>{value || '-'}</li>) : '-'}
            </ul>
          </div>
        </Fragment>)}
      </div>
      <DetailContainer label="Launch Year" value={launch_year} isLoading={loading} />
      <DetailContainer label="Successful Launch" value={launch_success} isLoading={loading} />
      <DetailContainer label="Successful Landing" value={launch_landing} isLoading={loading} />
    </div>
  );
};

export default SpaceDetailCard;
