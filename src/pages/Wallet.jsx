import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import WalletComponent from '../components/WalletComponent';
import ChatPopup from '../components/ChatPopup';
import { isLoggedIn } from '../utils/auth';
import Footer from '../components/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Wallet.css';


const Wallet = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isNavOpen, setIsNavOpen] = useState(width > 768);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(width > 768);
  const userIsLoggedIn = isLoggedIn();

  if (!userIsLoggedIn) {
    window.location.href = '/';
  }

  const fetchUserProfile = async (accessToken) => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://be.eliteplay.bloombyte.dev/user/me',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        setLoading(false);
      } else {
        console.error('Failed to fetch user profile:', response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchUserProfile(accessToken);
    } else {
      setLoading(false);
    }
    setChatOpen(width > 768)
  }, []);

  return (
    <div>
      {loading ? (
        <>
          <Skeleton
            count={8}
            baseColor="#0B1210"
            highlightColor="#6E6E71"
            height={100}
          />
        </>
      ) : (
        <>
          <div className="home-container">
            <div className={`${chatOpen ? 'min-page-chat' : ''}`}>
              <Navbar isNavOpen={isNavOpen} user={userProfile}  chatOpen={chatOpen} setChatOpen={setChatOpen} setIsNavOpen={setIsNavOpen} />
              <Sidenav
                isNavOpen={isNavOpen}
                setIsNavOpen={setIsNavOpen}
                user={userProfile}
                chatOpen={chatOpen} setChatOpen={setChatOpen}
              />
              <WalletComponent isNavOpen={isNavOpen} user={userProfile} />
              <Footer isNavOpen={isNavOpen} />
            </div>
            {chatOpen && (
              <ChatPopup chatOpen={chatOpen} setChatOpen={setChatOpen} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;
