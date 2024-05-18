import React, { useState, useRef, useEffect  } from 'react';
import UserInformationPopup from './UserInformationPopup';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileDropdown.css';
import { ACCESS_TOKEN } from '../utils/constants';
import { isElementClassOrChildOf } from '../utils/dom';
import { useAppContext } from '../hooks/useAppContext';
import { LOGOUT } from '../contexts/AppContext';

const ProfileDropdown = ({user, isOpen, setIsOpen}) => {
  const [isUserInformationPopupOpen, setIsUserInformationPopupOpen] =
    useState(false);
  const [isStatPopupOpen, setIsStatPopupOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { dispatch } = useAppContext();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch({ type: LOGOUT });
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isElementClassOrChildOf(event.target, 'nav-profile-button')
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      <div className="profile-dropdown" ref={dropdownRef}>
        <div className="profile-dropdown-content">
          <div className="profile-dropdown-cta">
            <Link to="/wallet">
              <img src="./wallet-grey.svg" alt="wallet-icon" />
              <span>Wallet</span>
            </Link>
          </div>
          <div
            onClick={() => {
              setIsUserInformationPopupOpen(!isUserInformationPopupOpen);
            }}
            className="profile-dropdown-cta"
          >
            <img src="./user.svg" alt="user-icon" />
            <span>User Information</span>
          </div>
          <div className="profile-dropdown-cta">
            <Link to="/accountsettings">
              <img src="./Settings.svg" alt="setting-icon" />
              <span>Account Settings</span>
            </Link>
          </div>
          <hr />
          <div onClick={handleLogout} className="profile-dropdown-cta">
            <img src="./logout-03.svg" alt="setting-icon" />
            <span>Log out</span>
          </div>
        </div>
      </div>
      {isUserInformationPopupOpen && (
        <UserInformationPopup
          user={user}
          isUserInformationPopupOpen={isUserInformationPopupOpen}
          setIsUserInformationPopupOpen={setIsUserInformationPopupOpen}
          isStatPopupOpen={isStatPopupOpen}
          setIsStatPopupOpen={setIsStatPopupOpen}
        />
      )}
    </>
  );
};

export default ProfileDropdown;
