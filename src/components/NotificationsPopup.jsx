import React, { useState } from 'react';
import './NotificationsPopup.css';

const NotificationsPopup = ({
  notificationsPopupOpen,
  setNotificationsPopupOpen,
}) => {
  const [activities, setActivities] = useState(false);
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="notificationpopup">
      <div className="notificationpopup-content">
        <div className="notificationpopup-header">
          <h3>Notification</h3>
          <img
            onClick={() => {
              setNotificationsPopupOpen(!notificationsPopupOpen);
            }}
            src="./cancel-x.svg"
            alt="cancel-close"
          />
        </div>
        <div className="notificationpopup_sections">
          <span
            onClick={() => setActivities(!activities)}
            className={`${!activities ? 'not-active' : ''}`}
          >
            System Notice
          </span>
          <span
            onClick={() => setActivities(!activities)}
            className={`${activities ? 'not-active' : ''}`}
          >
            Activities
          </span>
        </div>
        {activities ? (
          <div className="notification-boxes">
            <div className="not-box">
              <p className="not-time">3/9/2024, 6:30:20 AM</p>
              <p className="not-title">🏀Its Weekly Sports Bonus Time!⚽️</p>
              <div className="not-img-box"></div>
              <p className="not-main-txt">
                Weekly Sports bonus has been dropped successfully! 🔥
              </p>
            </div>
            {showAll ? (
              <>
                <div className="not-box">
                  <p className="not-time">3/9/2024, 6:30:20 AM</p>
                  <p className="not-title">
                    🏀Its Weekly Sports Bonus Time!⚽️
                  </p>
                  <div className="not-img-box"></div>
                  <p className="not-main-txt">
                    Weekly Sports bonus has been dropped successfully! 🔥
                  </p>
                </div>
                <div className="not-box">
                  <p className="not-time">3/9/2024, 6:30:20 AM</p>
                  <p className="not-title">
                    🏀Its Weekly Sports Bonus Time!⚽️
                  </p>
                  <div className="not-img-box"></div>
                  <p className="not-main-txt">
                    Weekly Sports bonus has been dropped successfully! 🔥
                  </p>
                </div>
                <p onClick={() => setShowAll(false)} className="show-all">
                  Show less{' '}
                  <img
                    className="down-icon"
                    src="./chevron-down.svg"
                    alt="down-icon"
                  />
                </p>
              </>
            ) : (
              <p onClick={() => setShowAll(true)} className="show-all">
                Show all{' '}
                <img
                  className="down-icon"
                  src="./chevron-down.svg"
                  alt="down-icon"
                />
              </p>
            )}
          </div>
        ) : (
          <div className="notification-boxes">
            <div className="not-box">
              <p className="not-time">6/5/2024, 1:30:20 PM</p>
              <p className="not-title">Important Notification</p>
              <div className="not-img-box"></div>
              <p className="not-main-txt">
                Weekly Sports bonus has been dropped successfully! 🔥
              </p>
            </div>
            {showAll ? (
              <>
                <div className="not-box">
                  <p className="not-time">3/9/2024, 6:30:20 AM</p>
                  <p className="not-title">
                    🏀Its Weekly Sports Bonus Time!⚽️
                  </p>
                  <div className="not-img-box"></div>
                  <p className="not-main-txt">
                    Weekly Sports bonus has been dropped successfully! 🔥
                  </p>
                </div>
                <div className="not-box">
                  <p className="not-time">3/9/2024, 6:30:20 AM</p>
                  <p className="not-title">
                    🏀Its Weekly Sports Bonus Time!⚽️
                  </p>
                  <div className="not-img-box"></div>
                  <p className="not-main-txt">
                    Weekly Sports bonus has been dropped successfully! 🔥
                  </p>
                </div>
                <p onClick={() => setShowAll(false)} className="show-all">
                  Show less{' '}
                  <img
                    className="down-icon"
                    src="./chevron-down.svg"
                    alt="down-icon"
                  />
                </p>
              </>
            ) : (
              <p onClick={() => setShowAll(true)} className="show-all">
                Show all{' '}
                <img
                  className="down-icon"
                  src="./chevron-down.svg"
                  alt="down-icon"
                />
              </p>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPopup;
