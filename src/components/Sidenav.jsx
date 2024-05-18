import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LiveSupportPopup from './LiveSupportPopup';
import VIPPopup from './VIPPopup';
import LanguagePopup from './LanguagePopup';
import './Sidenav.css';
import instance from '../utils/api';
import { useAppContext } from '../hooks/useAppContext';
import { useNav } from '../hooks/useUtils';
import { useDisclosure } from '../hooks/useDisclosure';

const Sidenav = () => {
  const [liveSupport, setLiveSupport] = useState(false);
  const [vipSupport, setVipSupport] = useState(false);
  const [languagePopup, setLanguagePopup] = useState(false);
  const [totalClaim, setTotalClaim] = useState(null);
  const [facuetClaimableForCurrentTier, setFaucetClaimableForCurrentTier] = useState(null);
  const [timeToNextClaim, setTimeToNextClaim] = useState(null);

  const location = useLocation();
  const isReferralsPage = location.pathname === '/referrals';
  const isDicePage = location.pathname === '/dice'
  const isCrashPage = location.pathname == '/crash'

  const { state } = useAppContext();
  const { toggleNav } = useNav();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/faucet/total-faucet-claimed");
        const data = response.data;
        setTotalClaim(data.totalClaim);
        setFaucetClaimableForCurrentTier(data.facuetClaimableForCurrentTier);
        setTimeToNextClaim(data.timeToNextClaim);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const { isOpen: isOpenVIP, onOpen: onOpenVIP, onClose: onCloseVIP } = useDisclosure();
  const { isOpen: isOpenLive, onOpen: onOpenLive, onClose: onCloseLive } = useDisclosure();


  return (
    <>
      <div className={`sidenav-expanded ${state.isNavOpen ? 'open' : ''}`}>
        <div style={{ display: 'none' }} className="sidenav__icon">
          <img
            className="nav-icon"
            onClick={() => toggleNav()}
            src="./menu-01.svg"
            alt="close-icon"
          />
          <Link to="/">
            {' '}
            <img src="./eliteplay.svg" alt="logo" />
          </Link>
        </div>
        <div className="sidenav__links">
          <div>
            <Link to="/referrals" style={{ textDecoration: 'none' }}>
              <div className={`sidenav__link ${isReferralsPage ? 'active' : ''}`}>
                <img src="./gift.svg" alt="reward-icon" />
                <span>Refer and Earn</span>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/dice" style={{ textDecoration: 'none' }}>
              <div className={`sidenav__link ${isDicePage ? 'active' : ''}`}>
                <img src="./dice.svg" alt="dice-icon" />
                <span>Dice</span>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/crash" style={{ textDecoration: 'none' }}>
              <div className={`sidenav__link ${isCrashPage ? 'active' : ''}`}>
                <img src="./chart-increase.svg" alt="crash-icon" />
                <span>Crash</span>
              </div>
            </Link>
          </div>
          <div>
            <div
              onClick={() => { onOpenVIP() }}
              className={`sidenav__link ${vipSupport ? 'active' : ''}`}
            >
              <img src="./VIP.svg" alt="vip-icon" />
              <span>
                <span className="sidenav-vip">VIP</span> Club
              </span>
            </div>
          </div>
          <div>
            <Link to="/dice" style={{ textDecoration: 'none' }}>
              <div
                onClick={() => {
                  onOpenLive();
                }}
                className={`sidenav__link ${liveSupport ? 'active' : ''}`}
              >
                <img src="./customer-support.svg" alt="support-icon" />
                <span>Live Support</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* {chatOpen && <ChatPopup chatOpen={chatOpen} setChatOpen={setChatOpen} />} */}
      {isOpenLive && (
        <LiveSupportPopup
          onCloseLive={onCloseLive}
        />
      )}
      {isOpenVIP && (
        <VIPPopup onCloseVIP={onCloseVIP} totalClaim={totalClaim} facuetClaimableForCurrentTier={facuetClaimableForCurrentTier} timeToNextClaim={timeToNextClaim} setTimeToNextClaim={setTimeToNextClaim} />
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
