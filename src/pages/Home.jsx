import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Hero from '../components/Hero';
import Recentwins from '../components/Recentwins';
import DepositCTA from '../components/DepositCTA';
import Livebets from '../components/Livebets';
import VIPCTA from '../components/VIPCTA';
import Description from '../components/Description';
import Footer from '../components/Footer';
import ChatPopup from '../components/ChatPopup';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Home.css';

const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

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
    console.log(accessToken);
    if (accessToken) {
      fetchUserProfile(accessToken);
    } else {
      setLoading(false);
    }
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
              <Navbar isNavOpen={isNavOpen} user={userProfile} chatOpen={chatOpen} setChatOpen={setChatOpen} />
              <Sidenav
                isNavOpen={isNavOpen}
                setIsNavOpen={setIsNavOpen}
                user={userProfile}
                chatOpen={chatOpen} setChatOpen={setChatOpen}
              />
              <Hero chatOpen={chatOpen} isNavOpen={isNavOpen} user={userProfile} />
              <Recentwins chatOpen={chatOpen} isNavOpen={isNavOpen} />
              <DepositCTA chatOpen={chatOpen} isNavOpen={isNavOpen} />
              <Livebets chatOpen={chatOpen} isNavOpen={isNavOpen} />
              <VIPCTA chatOpen={chatOpen} isNavOpen={isNavOpen} />
              <Description chatOpen={chatOpen} isNavOpen={isNavOpen} />
              <Footer chatOpen={chatOpen} isNavOpen={isNavOpen} />
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

export default Home;
