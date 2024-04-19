import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import ReferralSection from '../components/ReferralSection'
import Footer from '../components/Footer';

const Referral = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [referralInfo, setReferralInfo] = useState(null);
  const [referralCount, setReferralCount] = useState(null);

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

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <ReferralSection isNavOpen={isNavOpen} referralInfo={referralInfo} referralCount={referralCount} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  );
};

export default Referral;
