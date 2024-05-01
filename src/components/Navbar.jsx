import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
import ProfileDropdown from './ProfileDropdown';
import NotificationsPopup from './NotificationsPopup';
import DepositPopup from './DepositPopup';
import CurrencyDropdown from './CurrencyDropdown';
import ChatPopup from './ChatPopup';
import LiveSupportPopup from './LiveSupportPopup';
import VIPPopup from './VIPPopup';
import LanguagePopup from './LanguagePopup';
import './Navbar.css';

const Navbar = ({ isNavOpen, user, chatOpen, setChatOpen, setIsNavOpen }) => {
  const userIsLoggedIn = isLoggedIn();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notificationsPopupOpen, setNotificationsPopupOpen] = useState(false);
  const [depositPopupOpen, setDepositPopupOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [liveSupport, setLiveSupport] = useState(false);
  const [vipSupport, setVipSupport] = useState(false);
  const [languagePopup, setLanguagePopup] = useState(false);


  return (
    <>
      <div className="nav">
        <div className={`nav-games ${isNavOpen ? 'nav-expanded' : ''} ${chatOpen ? 'min-page-chat' : ''}`}>
          <div style={{ display: 'none' }} className="sidenav__icon">
            <img
              className="nav-icon"
              onClick={() => setIsNavOpen(!isNavOpen)}
              src="./menu-01.svg"
              alt="close-icon"
            />
            <a href="/">
              {' '}
              <img className="nav-logo" src="./eliteplay.svg" alt="logo" />
            </a>
          </div>
          <a style={{ textDecoration: 'none' }} href="/dice">
            <div className="nav-games__dice">
              <img src="./dice.svg" alt="dice-logo" />
              <span>Dice</span>
            </div>
          </a>

          <a style={{ textDecoration: 'none' }} href="/crash">
            <div className="nav-games__dice">
              <img src="./chart-increase.svg" alt="chart-logo" />
              <span>Crash</span>
            </div>
          </a>
        </div>

        {userIsLoggedIn ? (
          <div>
            <div className="nav-loggedin">
              <div className="nav-wallet">
                <div
                  onClick={() => {
                    setCurrencyDropdownOpen(!currencyDropdownOpen);
                  }}
                  className="nav-wallet_info"
                >
                  <img src="./twemoji_coin.svg" alt="coin" />
                  <span>{(user?.balance) ? Number(user?.balance).toFixed(5) : ''}</span>
                  <img src="./down-arrow.svg" alt="arrow" />
                </div>

                <div
                  onClick={() => {
                    setDepositPopupOpen(!depositPopupOpen);
                  }}
                  style={{ cursor: 'pointer' }}
                  className="nav-wallet_deposit"
                >
                  <img src="./wallet-02.svg" alt="deposit" />
                  <span>Deposit</span>
                </div>
              </div>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setNotificationsPopupOpen(!notificationsPopupOpen);
                }}
              >
                <img src="./not-bell.svg" alt="notification icon" />
              </div>
              <div
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                }}
                className="nav-profile"
              >
                <img
                  style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                  src={`${
                    user?.profilePictureUrl
                      ? user.profilePictureUrl
                      : './placeholder-profile-img.jpg'
                  }`}
                  alt="profile-img"
                />
                <img src="./down-arrow.svg" alt="arrow" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="nav-auth">
              <a style={{ textDecoration: 'none'}} href="/login">
                <button className="nav-auth__signin">Sign In</button>
              </a>
              <a style={{ textDecoration: 'none'}} href="/register">
                <button className="nav-auth__signup">Sign Up</button>
              </a>
            </div>
          </>
        )}
      </div>
      {isProfileDropdownOpen && <ProfileDropdown isOpen={isProfileDropdownOpen} setIsOpen={setIsProfileDropdownOpen} user={user} />}
      {notificationsPopupOpen && (
        <NotificationsPopup
          notificationsPopupOpen={notificationsPopupOpen}
          setNotificationsPopupOpen={setNotificationsPopupOpen}
        />
      )}
      {depositPopupOpen && (
        <DepositPopup
          depositPopupOpen={depositPopupOpen}
          setDepositPopupOpen={setDepositPopupOpen}
          user={user}
        />
      )}
      {currencyDropdownOpen && <CurrencyDropdown isOpen={currencyDropdownOpen} setIsOpen={setCurrencyDropdownOpen} balance={user?.balance} />}
      {chatOpen && <ChatPopup chatOpen={chatOpen} setChatOpen={setChatOpen} />}
      {liveSupport && (
        <LiveSupportPopup
          liveSupport={liveSupport}
          setLiveSupport={setLiveSupport}
        />
      )}
      {vipSupport && (
        <VIPPopup vipSupport={vipSupport} setVipSupport={setVipSupport} />
      )}
      {languagePopup && (
        <LanguagePopup
          languagePopup={languagePopup}
          setLanguagePopup={setLanguagePopup}
        />
      )}
    </>
  );
};

export default Navbar;
