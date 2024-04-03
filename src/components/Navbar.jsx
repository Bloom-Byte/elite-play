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

const Navbar = ({ isNavOpen }) => {
  const userIsLoggedIn = isLoggedIn();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notificationsPopupOpen, setNotificationsPopupOpen] = useState(false);
  const [depositPopupOpen, setDepositPopupOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [liveSupport, setLiveSupport] = useState(false);
  const [vipSupport, setVipSupport] = useState(false);
  const [languagePopup, setLanguagePopup] = useState(false);

  
  const location = useLocation();
  const isReferralsPage = location.pathname === '/referrals';
  const isDicePage = location.pathname === '/dice'
  const isCrashPage = location.pathname == '/crash'

  return (
    <>
      <div className="nav">
        <div className={`nav-games ${isNavOpen ? 'nav-expanded' : ''}`}>
          <div className="sidenav__icon">
            <img
              className="nav-icon"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              src="./menu-01.svg"
              alt="close-icon"
            />
            <a href="/">
              {' '}
              <img src="./eliteplay.svg" alt="logo" />
            </a>
          </div>
          <div className="nav-games__dice">
            <img src="./dice.svg" alt="dice-logo" />
            <span>
              <a href="/dice">Dice</a>
            </span>
          </div>
          <div className="nav-games__dice">
            <img src="./chart-increase.svg" alt="chart-logo" />
            <span>
              <a href="/crash">Crash</a>
            </span>
          </div>
        </div>
        {isMobileNavOpen && (
        <div className="sidenav-expanded">
          <div className="sidenav__icon">
            <img
              className="nav-icon"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              src="./menu-01.svg"
              alt="close-icon"
            />
            <a href="/">
              {' '}
              <img src="./eliteplay.svg" alt="logo" />
            </a>
          </div>
          <div className="sidenav__links">
            <div
              style={{
                backgroundColor: isReferralsPage ? '#0B281F' : 'transparent',
                padding: isReferralsPage ? '10px' : '0',
                borderRadius: isReferralsPage ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <a style={{ textDecoration: 'none' }}  href="/referrals">
                <div className="sidenav__link">
                  <img src="./gift.svg" alt="reward-icon" />
                  <span>Refer and Earn</span>
                </div>
              </a>
            </div>
            <div
              style={{
                backgroundColor: isDicePage ? '#0B281F' : 'transparent',
                padding:isDicePage ? '10px' : '0',
                borderRadius: isDicePage ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <a style={{ textDecoration: 'none' }} href="/dice">
                <div className="sidenav__link">
                  <img src="./dice.svg" alt="dice-icon" />
                  <span>Dice</span>
                </div>
              </a>
            </div>
            <div
              style={{
                backgroundColor: isCrashPage ? '#0B281F' : 'transparent',
                padding: isCrashPage ? '10px' : '0',
                borderRadius: isCrashPage ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <a style={{ textDecoration: 'none' }} href="/crash">
                <div className="sidenav__link">
                  <img src="./chart-increase.svg" alt="crash-icon" />
                  <span>Crash</span>
                </div>
              </a>
            </div>
            <div
              style={{
                backgroundColor: chatOpen ? '#0B281F' : 'transparent',
                padding: chatOpen ? '10px' : '0',
                borderRadius: chatOpen ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div
                onClick={() => setChatOpen(!chatOpen)}
                className="sidenav__link"
              >
                <img src="./message-01.svg" alt="chat-icon" />
                <span>Chatroom</span>
              </div>
            </div>
            <div
              style={{
                backgroundColor: vipSupport ? '#0B281F' : 'transparent',
                padding: vipSupport ? '10px' : '0',
                borderRadius: vipSupport ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div
                onClick={() => setVipSupport(!vipSupport)}
                className="sidenav__link"
              >
                <img src="./VIP.svg" alt="vip-icon" />
                <span>
                  <span className="sidenav-vip">VIP</span> Club
                </span>
              </div>
            </div>
            <div
              style={{
                backgroundColor: liveSupport ? '#0B281F' : 'transparent',
                padding: liveSupport ? '10px' : '0',
                borderRadius: liveSupport ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div
                onClick={() => setLiveSupport(!liveSupport)}
                className="sidenav__link"
              >
                <img src="./customer-support.svg" alt="support-icon" />
                <span>Live Support</span>
              </div>
            </div>
            <div
              style={{
                backgroundColor: languagePopup ? '#0B281F' : 'transparent',
                padding: languagePopup ? '10px' : '0',
                borderRadius: languagePopup ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div
                onClick={() => {
                  setLanguagePopup(!languagePopup);
                }}
                className="sidenav__link"
              >
                <img src="./translate.svg" alt="translate-icon" />
                <span>Language: English</span>
              </div>
            </div>
          </div>
        </div>
      )}
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
                  <span>0.00000</span>
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
                <img src="./profile-img.svg" alt="profile-img" />
                <img src="./down-arrow.svg" alt="arrow" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="nav-auth">
              <a href="/login">
                <button className="nav-auth__signin">Sign In</button>
              </a>
              <a href="/register">
                <button className="nav-auth__signup">Sign Up</button>
              </a>
            </div>
          </>
        )}
      </div>
      {isProfileDropdownOpen && <ProfileDropdown />}
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
        />
      )}
      {currencyDropdownOpen && <CurrencyDropdown />}
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
