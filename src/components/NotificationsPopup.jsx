import React from 'react';
import './NotificationsPopup.css';

const NotificationsPopup = ({notificationsPopupOpen, setNotificationsPopupOpen}) => {
  return (
    <div className="notificationpopup">
      <div className="notificationpopup-content">
        <div className="notificationpopup-header">
          <h3>Notification</h3>
          <img onClick={() => {setNotificationsPopupOpen(!notificationsPopupOpen)}} src="./cancel-x.svg" alt="cancel-close" />
        </div>
        <div className="notificationpopup_sections">
          <span className="not-active">System Notice</span>
          <span>Activities</span>
        </div>
        <div className='not-box'>
          <p className='not-time'>3/9/2024, 6:30:20 AM</p>
          <p className='not-title'>🏀Its Weekly Sports Bonus Time!⚽️</p>
          <div className='not-img-box'></div>
          <p className='not-main-txt'>Weekly Sports bonus has been dropped successfully! 🔥</p>
          <p className='show-all'>Show all <img className='down-icon' src="./chevron-down.svg" alt="down-icon" /></p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPopup;
