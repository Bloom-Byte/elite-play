import React, { useState } from 'react';
import axios from 'axios';
import './AccountSettingsSection.css';

const AccountSettingsSection = ({ isNavOpen, user }) => {
  const [currentSection, setCurrentSection] = useState('account-info');
  const [edituserName, setEditUsername] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [selfExclusion, setSelfExclusion] = useState(false);
  const [periodExclusion, setPeriodExclusion] = useState(false);
  const [editLanguage, setEditLanguage] = useState(false);
  const [editCurrency, setEditCurrency] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [confirmOldPassword, setConfirmOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('7');

  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleUploadProfile = async () => {
    setIsLoading(true);
    const url =
      'https://be.eliteplay.bloombyte.dev/user/me/update/upload-profile';
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('profile', profileImage);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      if (response.status === 201) {
        const responseData = await response.json();
        console.log('Profile picture updated:', responseData.message);
        setEditUsername(!edituserName);
      } else {
        setError(response.message);
        throw new Error('Failed to update profile picture');
      }
    } catch (error) {
      // setError(error.response.message);
      console.error('Error updating profile picture:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelfExclusion = () => {
    const checkboxes = document.querySelectorAll(
      '.container-exclude input[type="checkbox"]'
    );
    let atLeastOneChecked = false;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        atLeastOneChecked = true;
      }
    });

    if (atLeastOneChecked) {
      setSelfExclusion(!selfExclusion);
      setPeriodExclusion(!periodExclusion);
    } else {
      alert('Please select at least one option before proceeding.');
    }
  };

  const handleSelfExclusionPeriod = async () => {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('https://be.eliteplay.bloombyte.dev/user/self-exclude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          days: parseInt(selectedPeriod),
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        setMessage(responseData.message);

        setTimeout(() => {
          localStorage.removeItem('accessToken');
          window.location.href = '/';
        }, 2000);
      } else {
        console.error('Self-exclusion failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }  finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;

    document.body.appendChild(tempInput);

    tempInput.select();

    document.execCommand('copy');

    document.body.removeChild(tempInput);

    alert('Copied to clipboard: ' + text);
  };

  const handleConfirmPassword = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'https://be.eliteplay.bloombyte.dev/user/auth/login',
        {
          email: user?.email,
          password: confirmOldPassword,
        }
      );

      localStorage.setItem('accessToken', response.data.accessToken);
      setConfirmPassword(!confirmPassword);
      setChangePassword(!changePassword);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const updatePassword = async () => {
    setError('');
    const url = 'https://be.eliteplay.bloombyte.dev/user/update/password';
    const accessToken = localStorage.getItem('accessToken');

    const requestBody = {
      oldPassword: confirmOldPassword,
      newPassword: newPassword,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.status === 201) {
        window.location.href = '/login';
      } else {
        throw new Error(responseData.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error occurred during password update:', error.message);
      setError(error.message || error.response.message);
    }
  };

  return (
    <div
      className={`account-settings ${
        isNavOpen ? 'account-settings-extended' : ''
      }`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="account-setting-header">
          <span>Account Settings</span>
        </div>
        <div
          onClick={() => {
            setMobileNav(!mobileNav);
          }}
          className="accountsettings-mobile_nav"
        >
          <img src="./slant-menu.svg" alt="" />
        </div>
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
                    <img
                  style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                  src={`${
                    user?.profilePictureUrl
                      ? user.profilePictureUrl
                      : './placeholder-profile-img.jpg'
                  }`}
                  alt="profile-img"
                />
                      <div className="username_details">
                        <h2>{user ? user.name : 'Yuxeer'}</h2>
                        <p>User ID: {user ? user._id : '12357308'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setEditUsername(true);
                      }}
                    >
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
                    <span>{user?.email}</span>
                    <span className="email-txt-verified">
                      Verified <img src="./verfied-green.svg" />
                    </span>
                  </div>

                  {/* <button
                    onClick={() => {
                      setVerifyEmail(true);
                    }}
                  >
                    verify <img src="./Checkbox.svg" alt="check-icon" />
                  </button> */}
                </div>
              </div>
            </>
          )}
          {currentSection === 'security' && (
            <>
              <div>
                <div className="security_one">
                  <p className="setting-section__header">Security Setup</p>
                  <hr />
                  <div className="security_one-container">
                    <div className="security_one-box">
                      <img src="./mdi_password.svg" alt="lock-icon" />
                      <h4>Change Password</h4>
                      <p>
                        Change your password regularly to keep it unique and
                        secure.
                      </p>
                      <button
                        onClick={() => {
                          setConfirmPassword(true);
                        }}
                        className="black-btn"
                      >
                        Change Password
                      </button>
                    </div>
                    <div className="security_one-box">
                      <img src="./tabler_auth-2fa.svg" alt="2fa-icon" />
                      <h4>Two-factor authentication</h4>
                      <p>
                        Enable Two-factor to protect your account from
                        unauthorized access.
                      </p>
                      <button
                        onClick={() => {
                          setCurrentSection('auth');
                        }}
                        className="active-btn"
                      >
                        Enable 2FA
                      </button>
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
                    <img
                      onClick={() => {
                        setEditCurrency(!editCurrency);
                      }}
                      src="./Edit.svg"
                      alt="edit-icon"
                    />
                  </div>
                </div>
                <div className="preference-one">
                  <p>Change Language</p>
                  <div className="choice-box">
                    <span>English</span>
                    <img
                      onClick={() => {
                        setEditLanguage(!editLanguage);
                      }}
                      src="./Edit.svg"
                      alt="edit-icon"
                    />
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

                <button
                  onClick={() => {
                    setSelfExclusion(!selfExclusion);
                  }}
                  className="exclude-btn"
                >
                  Request Self-Exclusion
                </button>
              </div>
            </>
          )}
          {currentSection === 'auth' && (
            <>
              <div className="auth-security">
                <p className="setting-section__header">Security Setup</p>
                <hr />
                <p className="setting-section__header">
                  Google Authenticator(2FA)
                </p>
                <p className="auth-security-p">
                  Using Google Authentication to improve account security is
                  highly recommended.
                </p>
                <p className="auth-security-p">
                  You can follow the steps below to enable Google
                  Authentication.
                </p>
                <p className="setting-section__header">
                  (1) Download and install the Google Authenticator app
                </p>
                <p className="auth-security-p">
                  Using Google Authentication to improve account security is
                  highly recommended.
                </p>
                <p className="auth-security-p">
                  You can follow the steps below to enable Google
                  Authentication.
                </p>
                <p className="setting-section__header">
                  (2) Add secret key in Google Authenticator and backup
                </p>
                <p className="auth-security-p">
                  To enable Google Authentication, please scan or manually enter
                  this Secret Key into the Google Authenticator
                </p>
                <div className="auth-secret-key">
                  <span>76Y73NZRWD32HRVQ</span>
                  <span
                    onClick={() => {
                      copyToClipboard('76Y73NZRWD32HRVQ');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src="./copy-01.svg" alt="copy-icon" />{' '}
                    <span className="auth-security-copy">Copy</span>
                  </span>
                </div>
                <img
                  style={{ marginTop: '1rem' }}
                  src="./qr-auth.png"
                  alt="qr-code"
                />
                <p className="auth-security-p">
                  Ensure you backup your Google Authentication information (save
                  this QR code or secret key) before enabling it. <br /> This
                  will allow you to recover your Google Authentication in case
                  of phone loss.
                </p>
                <p className="setting-section__header">
                  (3) Enter the 6-digit code in your Google Authenticator and
                  login password
                </p>
                <input type="text" placeholder="Password" />
                <input type="text" placeholder="Authentication Code" />
                <button>Submit</button>
              </div>
            </>
          )}
        </div>
      </div>
      {edituserName && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <p>My Profile</p>
              <span
                onClick={() => {
                  setEditUsername(!edituserName);
                }}
                className="close"
              >
                X
              </span>
            </div>
            <div
              style={{ width: '200px' }}
              className="editusername-popup_main-content"
            >
              <div className="editusername-popup_edit-avatar">
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="selected-profile"
                  />
                ) : (
                  <img src={user?.profilePictureUrl} alt="selected-profile" />
                )}
                <input
                  style={{ display: 'none' }}
                  id="getFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="getFile">
                  {isLoading ? (
                    <div class="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    'Edit Your Avatar'
                  )}
                </label>
              </div>
              <button
                className="edit-username-popup_btn"
                onClick={handleUploadProfile}
              >
                Modify
              </button>
              {message && <p className="success-msg">{message}</p>}
              {error && <p className="error-msg">{error}</p>}
            </div>
          </div>
        </div>
      )}
      {verifyEmail && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <span
                onClick={() => {
                  setVerifyEmail(!verifyEmail);
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <div className="editusername-popup_edit-avatar">
                <img src="./fluent_mail-20-filled.svg" alt="mail-icon" />
                <p className="email-popup_header">Email Verification</p>
              </div>
              <p className="verify-text-sent">
                We’ve sent a verification code to{' '}
                <span className="email-bold"> yuxer@example.com</span>, please
                enter the 6-digit code below:
              </p>
              <input
                className="editusername-popup_edit-username-box"
                type="text"
              />
              <p className="email-popup_resend">Resend</p>
            </div>
          </div>
        </div>
      )}
      {confirmPassword && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <span
                onClick={() => {
                  setConfirmPassword(!confirmPassword);
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <div className="editusername-popup_edit-avatar">
                <img src="./mdi_password.svg" alt="lock-icon" />
                <p className="email-popup_header">Change Password</p>
              </div>
              <p className="verify-text-sent">
                For your safety, we need to verify your old password first.
              </p>
              <p className="editusername-popup_edit-username">Old Password</p>
              <input
                className="editusername-popup_edit-username-box"
                type="password"
                placeholder="Set Password"
                value={confirmOldPassword}
                onChange={(event) => {
                  setConfirmOldPassword(event.target.value);
                }}
              />
              {error && <p style={{ color: '#E14453' }}>{error}</p>}
              <button
                onClick={handleConfirmPassword}
                className="edit-username-popup_btn"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {changePassword && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <span> </span>
              <span
                onClick={() => {
                  setChangePassword(!changePassword);
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <div className="editusername-popup_edit-avatar">
                <img src="./mdi_password.svg" alt="lock-icon" />
                <p className="email-popup_header">Set Password</p>
              </div>
              <p className="editusername-popup_edit-username">Old Password</p>
              <input
                className="editusername-popup_edit-username-box"
                type="password"
                placeholder="Set Password"
                value={confirmOldPassword}
                onChange={(event) => {
                  setConfirmOldPassword(event.target.value);
                }}
              />
              <p className="editusername-popup_edit-username">
                Confirm Password
              </p>
              <input
                className="editusername-popup_edit-username-box"
                type="password"
                placeholder="Confirm Password"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
              <p
                style={{ marginTop: '2rem', marginBottom: '0px' }}
                className="verify-text-sent"
              >
                Re-login will be required after changing the password.
              </p>
              {error && <p style={{ color: '#E14453' }}>{error}</p>}
              <button
                onClick={updatePassword}
                className="edit-username-popup_btn"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {selfExclusion && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <p>Self-Exclusion</p>
              <span
                onClick={() => {
                  setSelfExclusion(!selfExclusion);
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <div className="self-exclusion_container">
                <p>
                  Please share with us what you want to achieve most through
                  self-exclusion:
                </p>
                <div className="self-exclude_options">
                  <label className="container-exclude">
                    Clear myself of negative emotions
                    <input type="checkbox" />
                    <span className="checkmark-exclude"></span>
                  </label>
                  <label className="container-exclude">
                    Overcome the addiction
                    <input type="checkbox" />
                    <span className="checkmark-exclude"></span>
                  </label>
                  <label className="container-exclude">
                    Cut my spending(time, money, etc.)
                    <input type="checkbox" />
                    <span className="checkmark-exclude"></span>
                  </label>
                  <label className="container-exclude">
                    Just be curious about this function
                    <input type="checkbox" />
                    <span className="checkmark-exclude"></span>
                  </label>
                </div>

                <p>
                  Or need help? <span className="chatwithus">Chat with us</span>
                  , we are always here for you.
                </p>
                <div className="self-exclusion-btns">
                  <button className="self-exclusion_cancel">Cancel</button>
                  <button
                    onClick={handleSelfExclusion}
                    className="self-exclusion_next"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {periodExclusion && (
        <div className="editusername-popup">
          <div
            style={{ width: '480px' }}
            className="editusername-popup_container"
          >
            <div className="editusername-popup_header">
              <p>Self-Exclusion</p>
              <span
                onClick={() => {
                  setPeriodExclusion(!periodExclusion);
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <div className="self-exclusion_container">
                <p>Select Period</p>

                <select
                  className="period-options"
                  name="period"
                  id="period"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="7">1 week</option>
                  <option value="30">1 month</option>
                  <option value="365">1 year</option>
                </select>
                <div className="self-exclusion-btns">
                  <button
                    onClick={() => {
                      setPeriodExclusion(!periodExclusion);
                    }}
                    className="self-exclusion_cancel"
                  >
                    Cancel
                  </button>
                  <button onClick={handleSelfExclusionPeriod} className="self-exclusion_next"> {isLoading ? (
                    <div class="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    'Next'
                  )}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editLanguage && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <p>Language</p>
              <span
                onClick={() => {
                  setEditLanguage(!editLanguage);
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <table className="language-table">
                <tbody>
                  <tr>
                    <td className="language-active">English</td>
                    <td>Indian English</td>
                    <td>Tiếng việt</td>
                    <td>Indonesian</td>
                  </tr>
                  <tr>
                    <td>日本語</td>
                    <td>한국어</td>
                    <td>Français</td>
                    <td>Español</td>
                  </tr>
                  <tr>
                    <td>Filipino</td>
                    <td>عربى</td>
                    <td>Marathi</td>
                    <td>Türkçe</td>
                  </tr>
                  <tr>
                    <td>فارسی</td>
                    <td>Português</td>
                    <td>Руccкий</td>
                    <td>Deutsch</td>
                  </tr>
                  <tr>
                    <td>ภาษาไทย</td>
                    <td>Suomi</td>
                    <td>Polski</td>
                    <td>Italiano</td>
                  </tr>
                  <tr>
                    <td>বাংলা</td>
                    <td>اردو</td>
                    <td>Українська</td>
                    <td>Melayu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {editCurrency && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <p>View in Fiat</p>
              <span
                onClick={() => {
                  setEditCurrency(!editCurrency);
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <table className="currency-table">
                <tbody>
                  <tr>
                    <td className="language-active">
                      {' '}
                      <img src="./cryptocurrency-color_usd.svg" alt="usd" /> USD
                      US Dollar
                    </td>
                    <td>
                      <img src="./euro.svg" alt="euro" /> EUR{' '}
                      <span className="country-name">Euro</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {mobileNav && (
        <div className="settings-dropdown">
          <div className="settings-dropdown-content">
            <div
              onClick={() => {
                setCurrentSection('account-info');
              }}
              className="settings-dropdown-cta"
            >
              <img src="./user.svg" alt="user-icon" />
              <span>Account Info</span>
            </div>
            <div
              onClick={() => {
                setCurrentSection('security');
              }}
              className="profile-dropdown-cta"
            >
              <img src="./lock-key.svg" alt="lock-key" />
              <span>Security</span>
            </div>
            <div
              onClick={() => {
                setCurrentSection('preferences');
              }}
              className="profile-dropdown-cta"
            >
              <img src="./list-setting.svg" alt="list-icon" />
              <span>Preferences</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettingsSection;
