import React from 'react';

import './spaceDetail.scss';

export const DetailContainer = ({ label, value }) => {
  const getValue = () => {
    if (value || value === 0 || value === false) {
      if (value === true || value === false) {
        return value ? 'true' : 'false';
      }
      return value;
    }
    return '-';
  };

  return (
    <div className="detail-container" >
      <span className="detail-label">{label}:</span>
      <span className="detail-value">{getValue()}</span>
    </div>
  );
};

const SpaceDetailCard = ({ detail }) => {
  const { mission_name, flight_number, mission_id, launch_year, launch_success, launch_landing, links } = detail;
  return (
    <div className="space-detail-card">
      <div className="spacex-detail-logo">
        <img src={links.mission_patch_small} alt={'Spacex_logo'} className="logo__icon" />
      </div>
      <div className="space-detail-heading">{mission_name} #{flight_number}</div>
      <div className="spacex-detail-mission">
        <div className="detail-label">Mission Ids:</div>
        <div className="detail-value">
          <ul className="text-list">
            {mission_id.length ? mission_id.map((value, index) => <li key={`${value} ${index}`}>{value || '-'}</li>) : '-'}
          </ul>
        </div>
      </div>
      <DetailContainer label="Launch Year" value={launch_year} />
      <DetailContainer label="Successful Launch" value={launch_success} />
      <DetailContainer label="Successful Landing" value={launch_landing} />
    </div>
  );
};

export default SpaceDetailCard;
