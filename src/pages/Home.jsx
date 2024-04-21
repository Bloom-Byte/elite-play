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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Home.css';

const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

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
    console.log(accessToken)
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
        <Skeleton count={8} baseColor='#0B1210' highlightColor='#6E6E71' height={100} />
        </>
      ) : (
        <>
          <Navbar isNavOpen={isNavOpen} user={userProfile} />
          <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <Hero isNavOpen={isNavOpen} user={userProfile} />
          <Recentwins isNavOpen={isNavOpen} />
          <DepositCTA isNavOpen={isNavOpen} />
          <Livebets isNavOpen={isNavOpen} />
          <VIPCTA isNavOpen={isNavOpen} />
          <Description isNavOpen={isNavOpen} />
          <Footer isNavOpen={isNavOpen} />
        </>
      )}
    </div>
  );
};

export default Home;
