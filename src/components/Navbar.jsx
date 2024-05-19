import { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import NotificationsPopup from './NotificationsPopup';
import DepositPopup from './DepositPopup';
import CurrencyDropdown from './CurrencyDropdown';
import ChatPopup from './ChatPopup';
import LiveSupportPopup from './LiveSupportPopup';
import VIPPopup from './VIPPopup';
import LanguagePopup from './LanguagePopup';
import './Navbar.css';
import { useAppContext } from '../hooks/useAppContext';
import { useNav } from '../hooks/useUtils';
import { Link } from 'react-router-dom';
import { useDisclosure } from '../hooks/useDisclosure';

const Navbar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notificationsPopupOpen, setNotificationsPopupOpen] = useState(false);

  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [liveSupport, setLiveSupport] = useState(false);
  const [vipSupport, setVipSupport] = useState(false);
  const [languagePopup, setLanguagePopup] = useState(false);

  const { state } = useAppContext();
  const { toggleNav } = useNav();

  const { isOpen: isOpenDeposit, onClose: onCloseDeposit, onOpen: onOpenDeposit } = useDisclosure();

  return (
    <>
      <div className="nav">
        <div className={`nav-games ${state.isNavOpen ? 'nav-expanded' : ''} ${state.chatOpen ? 'min-page-chat' : ''}`}>
          <div className="nav__icon">
            <img
              className="nav-icon"
              onClick={() => toggleNav()}
              src="./menu-01.svg"
              alt="close-icon"
            />
            <Link to="/">
              <img className="nav-logo" src="./eliteplay.svg" alt="logo" />
            </Link>
          </div>
        </div>

        <div className='navItems'>
          <Link to="/dice" style={{ textDecoration: 'none' }}>
            <div className="nav-games__dice">
              <img src="./dice.svg" alt="dice-logo" />
              <span>Dice</span>
            </div>
          </Link>
          <Link to="/crash" style={{ textDecoration: 'none' }}>
            <div className="nav-games__dice">
              <img src="./chart-increase.svg" alt="chart-logo" />
              <span>Crash</span>
            </div>
          </Link>
        </div>

        {state.user ? (
          <div className="nav-loggedin" style={{
            marginLeft: 'auto',
          }}>
            <div className="nav-wallet">
              <div style={{
                position: 'relative',
              }}>
                <div
                  onClick={() => {
                    setCurrencyDropdownOpen(!currencyDropdownOpen);
                  }}
                  className="nav-wallet_info"
                >
                  <img src="./twemoji_coin.svg" alt="coin" />
                  <span>{(state.user?.balance) ? Number(state.user?.balance).toFixed(5) : ''}</span>
                  <img src="./down-arrow.svg" alt="arrow" />
                </div>
                <CurrencyDropdown isOpen={currencyDropdownOpen} setIsOpen={setCurrencyDropdownOpen} balance={state.user?.balance} />
              </div>

              <div
                onClick={() => {
                  onOpenDeposit();
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
            <div className='nav-profile-button' style={{ position: 'relative' }}>
              <div
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                }}
                className="nav-profile"
              >
                <img
                  style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                  src={`${state.user?.profilePictureUrl
                    ? state.user.profilePictureUrl
                    : './placeholder-profile-img.jpg'
                    }`}
                  alt="profile-img"
                />
                <img src="./down-arrow.svg" alt="arrow" />
              </div>
              <ProfileDropdown isOpen={isProfileDropdownOpen} setIsOpen={setIsProfileDropdownOpen} user={state.user} />
            </div>
          </div>
        ) : (
          <>
            <div className="nav-auth">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="nav-auth__signin">Sign In</button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <button className="nav-auth__signup">Sign Up</button>
              </Link>
            </div>
          </>
        )}
      </div>
      {notificationsPopupOpen && (
        <NotificationsPopup
          notificationsPopupOpen={notificationsPopupOpen}
          setNotificationsPopupOpen={setNotificationsPopupOpen}
        />
      )}
      <DepositPopup
        isOpenDeposit={isOpenDeposit}
        onCloseDeposit={onCloseDeposit}
        user={state.user}
      />
      {state.chatOpen && <ChatPopup />}
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
