import React from 'react';
import './AccountSettingsSection.css';

const AccountSettingsSection = ({ isNavOpen }) => {
  return (
    <div
      className={`account-settings ${
        isNavOpen ? 'account-settings-extended' : ''
      }`}
    >
      <div>
        <span>Account Settings</span>
      </div>
      <div className="account-settings__sections">
        <div className="account-settings__navs">
          <div className="account-settings__nav account-settings__nav-active">
            <img src="./user.svg" alt="user-icon" />
            <span>Account Info</span>
          </div>
          <div className="account-settings__nav">
            <img src="./lock-key.svg" alt="lock-key" />
            <span>Security</span>
          </div>
          <div className="account-settings__nav">
            <img src="./list-setting.svg" alt="list-icon" />
            <span>Preferences</span>
          </div>
        </div>
        <div className="account-settings__main-sections">
          <div className="account-settings__section">
            <p>Profile Info</p>
            <hr />
            <div>
              <div>
                <div>
                  <img src="./profile-img.svg" alt="profile-image" />
                  <h2>Yuxeer</h2>
                  <p>User ID: 12357308</p>
                </div>
                <button>Edit</button>
              </div>
            </div>
          </div>
          <div className="account-settings__section">
            <p>Contact Info</p>
            <hr />
            <p>Email Verification</p>
            <div>
              <div>
                <span>yuxer@example.com</span>
              </div>
              <button>verify</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsSection;
