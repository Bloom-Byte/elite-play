import React, { useState, useEffect } from 'react';
import ReferralSection from '../components/ReferralSection';
import 'react-loading-skeleton/dist/skeleton.css';
import instance from '../utils/api';

const Referral = () => {
  const [referralInfo, setReferralInfo] = useState(null);
  const [referralCount, setReferralCount] = useState(null);

  useEffect(() => {
    const fetchReferralInfo = async () => {
      try {
        const response = await instance.get(
          '/referral'
        );
        if ((response.status === 200 || response.status === 201)) {
          const data = response.data;
          console.log(data)
          setReferralInfo(data);
        } else {
          throw new Error('Failed to fetch referral information');
        }
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReferralCount = async () => {
      try {
        const response = await instance.get(
          '/user/referral-count'
        );
        if ((response.status === 200 || response.status === 201)) {
          const data = response.data;
          setReferralCount(data);
        } else {
          throw new Error('Failed to fetch referral count');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReferralInfo();
    fetchReferralCount();
  }, []);

  return (
    <div style={{
      padding: '0 20px',
    }}>
      <ReferralSection
        referralInfo={referralInfo}
        referralCount={referralCount}
      />
    </div>
  );
};

export default Referral;
