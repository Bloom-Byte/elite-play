import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import ReferralSection from '../components/ReferralSection'
import Footer from '../components/Footer';

const Referral = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [referralInfo, setReferralInfo] = useState(null);
  const [referralCount, setReferralCount] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const fetchReferralInfo = async () => {
      try {
        const response = await fetch('https://be.eliteplay.bloombyte.dev/referral', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setReferralInfo(data);
        } else {
          throw new Error('Failed to fetch referral information');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReferralCount = async () => {
      try {
        const response = await fetch('https://be.eliteplay.bloombyte.dev/user/referral-count', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setReferralInfo(data);
        } else {
          throw new Error('Failed to fetch referral count');
        }
      }  catch (error) {
        console.error(error);
      }
    } 

    fetchReferralInfo();
    fetchReferralCount();
  }, []);

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
      <Navbar isNavOpen={isNavOpen} user={userProfile} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} user={userProfile} />
      <ReferralSection isNavOpen={isNavOpen} referralInfo={referralInfo} referralCount={referralCount} user={userProfile} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  );
};

export default Referral;
