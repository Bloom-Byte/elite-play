import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChatPopup from './ChatPopup';
import LiveSupportPopup from './LiveSupportPopup';
import VIPPopup from './VIPPopup';
import LanguagePopup from './LanguagePopup';
import './Sidenav.css';

const Sidenav = ({ isNavOpen, setIsNavOpen }) => {
  const [clickedItems, setClickedItems] = useState(Array(7).fill(false));
  const [chatOpen, setChatOpen] = useState(false);
  const [liveSupport, setLiveSupport] = useState(false);
  const [vipSupport, setVipSupport] = useState(false);
  const [languagePopup, setLanguagePopup] = useState(false);

  const location = useLocation();
  const isReferralsPage = location.pathname === '/referrals';
  const isDicePage = location.pathname === '/dice'
  const isCrashPage = location.pathname == '/crash'

  const handleClick = (index) => {
    const updatedClickedItems = clickedItems.map((item, i) =>
      i === index ? true : false
    );
    setClickedItems(updatedClickedItems);
  };

  return (
    <>
      {isNavOpen ? (
        <div className={`sidenav-expanded ${isNavOpen ? 'open' : ''}`}>
          <div className="sidenav__icon">
            <img
              className="nav-icon"
              onClick={() => setIsNavOpen(false)}
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
              {/* <div
                onClick={() => {
                  setLanguagePopup(!languagePopup);
                }}
                className="sidenav__link"
              >
                <img src="./translate.svg" alt="translate-icon" />
                <span>Language: English</span>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="sidenav-mini">
          <div className="sidenav__icon">
            <img
              className="nav-icon"
              src="./menu-01.svg"
              alt="menu-icon"
              onClick={() => setIsNavOpen(true)}
            />
          </div>
          <div className="sidenav__links">
            <a href="/referrals">
            <div className="sidenav__link-mini">
              <img src="./gift.svg" alt="reward-icon" />
            </div>
            </a>
            <a href="/dice">
            <div className="sidenav__link-mini">
              <img src="./dice.svg" alt="dice-icon" />
            </div>
            </a>
            <a href="/crash">
            <div className="sidenav__link-mini">
              <img src="./chart-increase.svg" alt="crash-icon" />
            </div>
            </a>
            <div onClick={() => setChatOpen(!chatOpen)} className="sidenav__link-mini">
              <img src="./message-01.svg" alt="chat-icon" />
            </div>
            <div onClick={() => setLiveSupport(!liveSupport)} className="sidenav__link-mini">
              <img src="./customer-support.svg" alt="support-icon" />
            </div>
            {/* <div onClick={() => {
                  setLanguagePopup(!languagePopup);
                }} className="sidenav__link-mini">
              <img src="./translate.svg" alt="translate-icon" />
            </div> */}
          </div>
        </div>
      )}
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

export default Sidenav;
