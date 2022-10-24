import React from 'react';
import menuIcon from '../../../../assets/menuIcon.png';
import backIcon from '../../../../assets/backIcon.png';
import arrowDownIcon from '../../../../assets/arrowDownIcon.png';
import avatar from '../../../../assets/avatar.png';

const Subheader = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="project-name-panel left-margin-16">
          <div className="project-names">
            <div className="header-item">Название проекта</div>
            <div className="sub-text">Аббревиатура</div>
          </div>
          <img className="icon project-name-panel-icon" src={arrowDownIcon} />
        </div>
        <div className="operations-type-container">
          <div className="header-item item-highlighted">Строительно-монтажные работы</div>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
