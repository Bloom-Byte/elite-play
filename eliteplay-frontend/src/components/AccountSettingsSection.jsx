import React, { useState } from 'react';
import './AccountSettingsSection.css';

const AccountSettingsSection = ({ isNavOpen }) => {
  const [currentSection, setCurrentSection] = useState('account-info');

  return (
    <div
      className={`account-settings ${
        isNavOpen ? 'account-settings-extended' : ''
      }`}
    >
      <div className="account-setting-header">
        <span>Account Settings</span>
      </div>
      <div className="account-settings__sections">
        <div className="account-settings__navs">
          <div
            onClick={() => {
              setCurrentSection('account-info');
            }}
            className={`account-settings__nav ${
              currentSection === 'account-info'
                ? 'account-settings__nav-active'
                : ''
            }`}
          >
            <img src="./user.svg" alt="user-icon" />
            <span>Account Info</span>
          </div>
          <div
            onClick={() => {
              setCurrentSection('security');
            }}
            className={`account-settings__nav ${
              currentSection === 'security'
                ? 'account-settings__nav-active'
                : ''
            }`}
          >
            <img src="./lock-key.svg" alt="lock-key" />
            <span>Security</span>
          </div>
          <div
            onClick={() => {
              setCurrentSection('preferences');
            }}
            className={`account-settings__nav ${
              currentSection === 'preferences'
                ? 'account-settings__nav-active'
                : ''
            }`}
          >
            <img src="./list-setting.svg" alt="list-icon" />
            <span>Preferences</span>
          </div>
        </div>
        <div className="account-settings__main-sections">
          {currentSection === 'account-info' && (
            <>
              <div className="account-settings__section">
                <p className="setting-section__header">Profile Info</p>
                <hr />
                <div>
                  <div className="main-profile-info-box">
                    <div className="main-profile-info">
                      <img src="./profile-img.svg" alt="profile-image" />
                      <div className="username_details">
                        <h2>Yuxeer</h2>
                        <p>User ID: 12357308</p>
                      </div>
                    </div>
                    <button>
                      Edit <img src="./Edit.svg" alt="edit-icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="account-settings__section">
                <p className="setting-section__header">Contact Info</p>
                <hr />
                <p className="email-verify-txt">Email Verification</p>
                <div className="email-verify_container">
                  <div className="email-txt">
                    <span>yuxer@example.com</span>
                    <img
                      src="./bitcoin-icons_verify-filled.svg"
                      alt="verify-icon"
                    />
                  </div>
                  <button>
                    verify <img src="./Checkbox.svg" alt="check-icon" />
                  </button>
                </div>
              </div>
            </>
          )}
          {currentSection === 'security' && (
            <>
              <div>
                <div className="security_one">
                  <p className="setting-section__header">Security Checkup</p>
                  <hr />
                  <div className="security_one-container">
                    <div className="security_one-box">
                      <img src="./mdi_password.svg" alt="lock-icon" />
                      <h4>Change Password</h4>
                      <p>
                        Change your password regularly to keep it unique and
                        secure.
                      </p>
                      <button className="black-btn">Change Password</button>
                    </div>
                    <div className="security_one-box">
                      <img src="./tabler_auth-2fa.svg" alt="2fa-icon" />
                      <h4>Two-factor authentication</h4>
                      <p>
                        Enable Two-factor to protect your account from
                        unauthorized access.
                      </p>
                      <button className="active-btn">Enable 2FA</button>
                    </div>
                  </div>
                </div>
                <div className="session-frame">
                  <div className="session-main">
                    <p className="setting-section__header">Sessions</p>
                    <table className="session-table">
                      <thead>
                        <tr>
                          <th>Device</th>
                          <th>Location</th>
                          <th>IP Address</th>
                          <th>Last Used</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Windows 10 (Chrome 12)</td>
                          <td>NG</td>
                          <td>102.88.34.168</td>
                          <td>Online</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentSection === 'preferences' && (
            <>
              <div className="preference-box">
                <p className="setting-section__header">Account Preferences</p>
                <hr />
                <div className="preference-one">
                  <p>View in fiat</p>
                  <div className="choice-box">
                    <span>USD</span>
                    <img src="./Edit.svg" alt="edit-icon" />
                  </div>
                </div>
                <div className="preference-one">
                  <p>Change Language</p>
                  <div className="choice-box">
                    <span>English</span>
                    <img src="./Edit.svg" alt="edit-icon" />
                  </div>
                </div>
              </div>
              <div className="preference-box">
                <p className="setting-section__header">Privacy Preferences</p>
                <hr />
                <div className="preference-one">
                  <p>Hide my gaming data on profile</p>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
                <div className="preference-one">
                  <p>Hide my username from public lists</p>
                  <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <div className="preference-box">
                <p className="setting-section__header">Self-Exclusion</p>
                <hr />
                <div className="preference-one">
                  <p>
                    This function allows you to close your account for a period
                    of time.
                  </p>
                </div>

                <button className="exclude-btn">Request Self-Exclusion</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsSection;
