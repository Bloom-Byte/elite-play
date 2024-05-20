import { useState, useRef, useEffect, useCallback } from 'react';
import UserInformationPopup from './UserInformationPopup';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.css';
import { isElementClassOrChildOf } from '../utils/dom';
import { useToast } from '@chakra-ui/react';
import { useDisclosure } from '../hooks/useDisclosure';
import { useLogout } from '../hooks/useLogout';

const ProfileDropdown = ({ user, isOpen, setIsOpen }) => {
  const [isStatPopupOpen, setIsStatPopupOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { isOpen: isOpenUser, onClose: onCloseUser, onOpen: onOpenUser } = useDisclosure();

  const toast = useToast();
  const logout = useLogout();

  const handleLogout = () => {
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    logout();
  };

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isElementClassOrChildOf(event.target, 'nav-profile') &&
        !isElementClassOrChildOf(event.target, 'profile-dropdown')
      ) {
        close();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close]);

  return (
    <>
      <div className={`profile-dropdown ${isOpen ? 'active' : ''}`} ref={dropdownRef}>
        <div className="profile-dropdown-content">
          <div className="profile-dropdown-cta" onClick={() => {
            navigate('/wallet');
            close();
          }}>
            <img src="./wallet-grey.svg" alt="wallet-icon" />
            <span>Wallet</span>
          </div>
          <div
            onClick={() => {
              onOpenUser();
              close();
            }}
            className="profile-dropdown-cta"
          >
            <img src="./user.svg" alt="user-icon" />
            <span>User Information</span>
          </div>
          <div className="profile-dropdown-cta" onClick={() => {
            navigate('/accountsettings');
            close();
          }}>
            <img src="./Settings.svg" alt="setting-icon" />
            <span>Account Settings</span>
          </div>
          <hr />
          <div onClick={handleLogout} className="profile-dropdown-cta">
            <img src="./logout-03.svg" alt="setting-icon" />
            <span>Log out</span>
          </div>
        </div>
      </div>
      <UserInformationPopup
        user={user}
        isOpenUser={isOpenUser}
        onCloseUser={onCloseUser}
        isStatPopupOpen={isStatPopupOpen}
        setIsStatPopupOpen={setIsStatPopupOpen}
      />
    </>
  );
};

export default ProfileDropdown;
