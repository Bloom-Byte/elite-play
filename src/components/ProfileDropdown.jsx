import React, { useState } from 'react';
import UserInformationPopup from './UserInformationPopup';
import './ProfileDropdown.css';

const ProfileDropdown = ({user}) => {
  const [isUserInformationPopupOpen, setIsUserInformationPopupOpen] =
    useState(false);
  const [isStatPopupOpen, setIsStatPopupOpen] = useState(false);

  return (
    <>
      <div className="profile-dropdown">
        <div className="profile-dropdown-content">
          <div className="profile-dropdown-cta">
            <a href="/wallet">
              <img src="./wallet-grey.svg" alt="wallet-icon" />
              <span>Wallet</span>
            </a>
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
            <img src="./bitcoin-withdraw.svg" alt="wallet" />
            <span>Withdraw</span>
          </div>
          <div className="profile-dropdown-cta">
            <img src="./bitcoin-transaction.svg" alt="wallet" />
            <span>Transaction</span>
          </div>
          <div className="profile-dropdown-cta">
            <img src="./VIP.svg" alt="vip-icon" />
            <span>
              <span className="vip">VIP</span> Transaction
            </span>
          </div>
          <div className="profile-dropdown-cta">
            <a href="/accountsettings">
              <img src="./Settings.svg" alt="setting-icon" />
              <span>Account Settings</span>
            </a>
          </div>
          <hr />
          <div className="profile-dropdown-cta">
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
