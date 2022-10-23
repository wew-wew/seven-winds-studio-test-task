import React from 'react';
import menuIcon from '../../../../theme/menuIcon.png';
import backIcon from '../../../../theme/backIcon.png';
import arrowDownIcon from '../../../../theme/arrowDownIcon.png';
import avatar from '../../../../theme/avatar.png';

const Header = () => {
  return (
    <div className="header-container">
      <div className='header main-header'>
        <div className='header-left left-margin-16'>
          <img className='icon right-margin-20' src={menuIcon} />
          <img className='icon right-margin-20' src={backIcon} />
          <div className='header-item right-margin-20 item-selected'>Просмотр</div>
          <div className='header-item right-margin-20'>Управление</div>
        </div>
        <div className='header-right'>
          <img className='header-item avatar' src={avatar} />
          <div className='header-item header-item-user'>Антон Петров</div>
          <img className='icon' src={arrowDownIcon} />
        </div>
      </div>
    </div>
  );
};

export default Header;
