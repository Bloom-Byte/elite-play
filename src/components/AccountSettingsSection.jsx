import { useState } from 'react';
import './AccountSettingsSection.css';
import instance from '../utils/api';
import { ACCESS_TOKEN } from '../utils/constants';
import { useAppContext } from '../hooks/useAppContext';
import { Divider, useToast } from '@chakra-ui/react';
import { useCopyToClipboard } from '../hooks/useCopy';
import { FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import { MdRoomPreferences } from "react-icons/md";
import Modal from './Modal';
import { useDisclosure } from '../hooks/useDisclosure';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { validatePassword } from '../utils/auth';
import { useLogout } from '../hooks/useLogout';

const AccountSettingsSection = () => {
  const [currentSection, setCurrentSection] = useState('account-info');
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [selfExclusion, setSelfExclusion] = useState(false);
  const [periodExclusion, setPeriodExclusion] = useState(false);
  const [editLanguage, setEditLanguage] = useState(false);
  const [editCurrency, setEditCurrency] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [confirmOldPassword, setConfirmOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [showPassword, setShowPassword] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  const { state } = useAppContext();
  const { isOpen: isOpenEditProfile, onClose: onCloseEditProfile, onOpen: onOpenEditProfile } = useDisclosure();
  const { isOpen: isOpenChangePassword, onClose: onCloseChangePassword, onOpen: onOpenChangePassword } = useDisclosure();

  const toast = useToast();
  const updateUser = useUpdateUser();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleUploadProfile = async () => {
    setIsLoading(true);
    const url = `/user/me/update/upload-profile`;

    const formData = new FormData();
    formData.append('profile', profileImage);

    try {
      const response = await instance.post(url, formData);

      if (response.status === 201) {
        const responseData = response.data;
        console.log('Profile picture updated:', responseData.message);
        toast({
          position: 'top',
          status: 'success',
          title: 'Success',
          description: responseData.message,
        });
        updateUser();
      } else {
        throw new Error('Failed to update profile picture');
      }
    } catch (error) {
      toast({
        position: 'top',
        status: 'error',
        title: 'Error',
        description: 'Failed to update profile picture',
      });
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
      toast({
        position: 'bottom',
        status: 'error',
        title: 'Required',
        description: 'Please select at least one option before proceeding.',
      });
    }
  };

  const handleSelfExclusionPeriod = async () => {
    try {
      setIsLoading(true);
      const response = await instance.post(`/user/self-exclude`, {
        days: parseInt(selectedPeriod),
      });

      if ((response.status === 200 || response.status === 201)) {
        const responseData = response.data;
        console.log(responseData.data);
        toast({
          position: 'top',
          status: 'success',
          title: 'Success',
          description: responseData.data.message,
          isClosable: true,
        });

        setTimeout(() => {
          localStorage.removeItem(ACCESS_TOKEN);
          window.location.href = '/';
        }, 2000);
      } else {
        console.error('Self-exclusion failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = useCopyToClipboard();
  const logout = useLogout();

  const updatePassword = async () => {
    const url = '/user/update/password';

    if (!validatePassword(newPassword)) {
      const error = 'Password must be at least 8 characters long and include at least one number and one special character.'
      setIsLoading(false);
      toast({
        position: 'top',
        status: 'error',
        title: 'Error',
        description: error,
      });
      return;
    }

    // Validate new password and confirm password
    if (newPassword !== confirmNewPassword) {
      toast({
        position: 'top',
        status: 'error',
        title: 'Error',
        description: 'New and confirm passwords do not match',
      });
      return;
    }

    const requestBody = {
      oldPassword: confirmOldPassword,
      newPassword: newPassword,
    };

    try {
      const response = await instance.post(url, requestBody);

      const responseData = response.data;

      if (response.status === 201) {
        toast({
          position: 'top',
          status: 'success',
          title: 'Password Updated',
          description: 'Your password has been updated successfully. Please login again.',
          isClosable: true,
        });
        logout();
      } else {
        throw new Error(responseData.data || 'Failed to update password');
      }
    } catch (error) {
      console.error(error);
      toast({
        position: 'top',
        status: 'error',
        title: 'Error',
        description: error?.response?.data?.error || 'Failed to update password',
      });
    }
  };

  return (
    <div
      className={`account-settings`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="account-setting-header">
          <span>Account Settings</span>
        </div>
        <div style={{
          position: 'relative'
        }}>
          <div
            onClick={() => {
              setMobileNav(!mobileNav);
            }}
            className="accountsettings-mobile_nav"
          >
            <img src="./slant-menu.svg" alt="" />
          </div>
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

      </div>

      <div className="account-settings__sections">
        <div className="account-settings__navs">
          <div
            onClick={() => {
              setCurrentSection('account-info');
            }}
            className={`account-settings__nav ${currentSection === 'account-info'
              ? 'account-settings__nav-active'
              : ''
              }`}
          >
            <FiUser size={'1.5rem'} />
            <span>Account Info</span>
          </div>
          <div
            onClick={() => {
              setCurrentSection('security');
            }}
            className={`account-settings__nav ${currentSection === 'security'
              ? 'account-settings__nav-active'
              : ''
              }`}
          >
            <MdOutlineSecurity size={'1.5rem'} />
            <span>Security</span>
          </div>
          <div
            onClick={() => {
              setCurrentSection('preferences');
            }}
            className={`account-settings__nav ${currentSection === 'preferences'
              ? 'account-settings__nav-active'
              : ''
              }`}
          >
            <MdRoomPreferences size={'1.5rem'} />
            <span>Preferences</span>
          </div>
        </div>
        <div className="account-settings__main-sections">
          {currentSection === 'account-info' && (
            <>
              <div className="account-settings__section">
                <p className="setting-section__header">Profile Info</p>
                <Divider mt={2} />
                <div>
                  <div className="main-profile-info-box">
                    <div className="main-profile-info">
                      <img
                        style={{ borderRadius: '50%', width: '80px', height: '80px' }}
                        src={`${state.user?.profilePictureUrl
                          ? state.user.profilePictureUrl
                          : './placeholder-profile-img.jpg'
                          }`}
                        alt="profile-img"
                      />
                      <div className="username_details">
                        <h2>{state.user?.name}</h2>
                        <p>User ID: {state.user?._id}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onOpenEditProfile();
                      }}
                    >
                      Edit <img src="./Edit.svg" alt="edit-icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="account-settings__section">
                <p className="setting-section__header">Contact Info</p>
                <Divider mt={2} />
                <p className="email-verify-txt">Email Verification</p>
                <div className="email-verify_container">
                  <div className="email-txt">
                    <span>{state.user?.email}</span>
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
                  <Divider mt={2} />
                  <div className="security_one-container">
                    <div className="security_one-box">
                      <img src="./mdi_password.svg" alt="lock-icon" />
                      <div className="text-content">
                        <h4>Change Password</h4>
                        <p>
                          Change your password regularly to keep it unique and
                          secure.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          onOpenChangePassword()
                        }}
                        className="active-btn"
                      >
                        Change Password
                      </button>
                    </div>
                    <div className="security_one-box">
                      <img src="./tabler_auth-2fa.svg" alt="2fa-icon" />
                      <div className="text-content">
                        <h4>Two-factor authentication (Coming Soon)</h4>
                        <p>
                          Enable Two-factor to protect your account from
                          unauthorized access.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentSection('auth');
                        }}
                        className="black-btn"
                        disabled
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
                <Divider mt={2} />
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
                <Divider mt={2} />
                <div className="preference-one">
                  <p>Hide my gaming data on profile</p>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="preference-one">
                  <p>Hide my username from public lists</p>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              <div className="preference-box">
                <p className="setting-section__header">Self-Exclusion</p>
                <Divider mt={2} />
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
                <Divider mt={2} />
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
      <Modal width={'400px'} title={"My Profile"} isOpen={isOpenEditProfile} close={onCloseEditProfile}>
        <div className="editusername-popup_edit-avatar">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="selected-profile"
            />
          ) : (
            <img src={state.user?.profilePictureUrl
              ? state.user.profilePictureUrl
              : './placeholder-profile-img.jpg'} alt="current-profile" />
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
              <div className="lds-ring">
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
          Modify Avatar
        </button>
      </Modal>
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
                <span className="email-bold">yuxer@example.com</span>, please
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
      <Modal width={'400px'} title={""} isOpen={isOpenChangePassword} close={onCloseChangePassword}>
        <div className="editusername-popup_edit-avatar">
          <img src="./mdi_password.svg" alt="lock-icon" />
          <p className="email-popup_header">Change Password</p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '1rem',
        }}>
          <div>
            <p className="editusername-popup_edit-username">Old Password</p>
            <div className='input-group'>
              <input
                className="editusername-popup_edit-username-box"
                type={showPassword ? 'text' : 'password'}
                placeholder="Set Password"
                value={confirmOldPassword}
                onChange={(event) => {
                  setConfirmOldPassword(event.target.value);
                }}
              />
              <span className='addon' onClick={() => {
                setShowPassword(!showPassword);
              }}>
                {
                  showPassword ? <FiEyeOff /> : <FiEye />
                }
              </span>
            </div>
          </div>
          <div>
            <p className="editusername-popup_edit-username">New Password</p>
            <div className='input-group'>
              <input
                className="editusername-popup_edit-username-box"
                type={showPassword ? 'text' : 'password'}
                placeholder="Set Password"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
              <span className='addon' onClick={() => {
                setShowPassword(!showPassword);
              }}>
                {
                  showPassword ? <FiEyeOff /> : <FiEye />
                }
              </span>
            </div>
          </div>
          <div>
            <p className="editusername-popup_edit-username">
              Confirm Password
            </p>
            <div className='input-group'>
              <input
                className="editusername-popup_edit-username-box"
                type={showPassword ? 'text' : 'password'}
                placeholder="Set Password"
                value={confirmNewPassword}
                onChange={(event) => {
                  setConfirmNewPassword(event.target.value);
                }}
              />
              <span className='addon' onClick={() => {
                setShowPassword(!showPassword);
              }}>
                {
                  showPassword ? <FiEyeOff /> : <FiEye />
                }
              </span>
            </div>
          </div>
        </div>
        <p className="verify-text-sent">
          Re-login will be required after changing the password.
        </p>
        <button
          onClick={updatePassword}
          className="edit-username-popup_btn"
        >
          Confirm
        </button>
      </Modal>

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
                    <div className="lds-ring">
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
    </div>
  );
};

export default AccountSettingsSection;
