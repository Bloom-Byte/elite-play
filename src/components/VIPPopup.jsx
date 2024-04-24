import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VIPPopup.css';

const VIPPopup = ({vipSupport, setVipSupport}) => {
    const [lastClaimTime, setLastClaimTime] = useState(null);
    const [nextClaimTime, setNextClaimTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
          if (nextClaimTime) {
            const currentTime = new Date().getTime();
            const timeRemaining = Math.max(nextClaimTime - currentTime, 0);
            setTimeLeft(timeRemaining);
          }
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, [nextClaimTime]);
    
      // Function to handle claiming the token
      const handleClaimToken = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
          const response = await fetch('https://be.eliteplay.bloombyte.dev/faucet/claim', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({}) // Include an empty object as the body for POST request
          });
      
          if (response.ok) {
            // Claim successful, update last claim time and calculate next claim time
            setLastClaimTime(new Date().getTime());
            setNextClaimTime(new Date().getTime() + (30 * 60 * 1000)); // Set next claim time 30 minutes ahead
            // Optionally, you can handle the response from the claim request
            const responseData = await response.json();
            console.log('Claim successful:', responseData);
          } else {
            // Handle non-successful response
            console.error('Error claiming token:', response.statusText);
            // Optionally, you can handle errors from the claim request
          }
        } catch (error) {
          console.error('Error claiming token:', error);
          // Optionally, you can handle errors from the claim request
        }
      };
    

  return (
    <div className="vippopup">
      <div className="vippopup-content">
        <div className="vippopup-header">
          <img className='vipribbon' src="./vip-ribbon.svg" alt="vip-icon" />
          <img onClick={() => setVipSupport(!vipSupport)} className='vipclose' src="./cancel-x.svg" alt="cancel-icon" />
        </div>
        <div className='scrollsection'>
        <div className='vippopup-desc'>
          <p>
            Level up to get exclusive access to generous rewards and
            personalized gifts! Join our community of elite players and enjoy
            the best that online gaming has to offer. <span className='highlight-level'> View level up details</span>
          </p>
        </div>
        <div className='vippopup-progess_boxes'>
            <div className='viplevel-box' style={{backgroundImage: 'url(./bronze_bg.jpg)'}}>
                <h3>Your VIP Progress</h3>
                <p className='xplevel'>65 XP</p>
                <input type="range" />
                <p className='xplevel'>135 XP until VIP 3</p>
            </div>
            <div className='vippopup-reward-box'>
                <h3>Faucet Reward</h3>
                <h2><img className='levelcoin' src="./twemoji_coin.svg" alt="coin-icon" /> <span className='coinlevel-rewards'>0.0029</span></h2>
                <p className='reward-details'>Total Reward Claimed <span className='coinamount'>0.0029</span> <span>Nest Reward in: <span className='nextrewardtime'>(${Math.ceil(timeLeft / 1000)}s left)</span></span></p>
                <button  onClick={handleClaimToken} disabled={timeLeft > 0} className={`${timeLeft > 0 ? 'disabled ': ''}vippopup-claimreward-btn'`}>Claim Reward</button>
            </div>
        </div>
        <div className='alllevels'>
            <h2>VIP LEVELS</h2>
            <div className='viplevels-boxes'>
                <div className='vippopuplevel_box'>
                    <div className='vippopuplevel_box-reward-image'>
                        <img src="./bronzeplate.svg" alt="bronzereward" />
                    </div>
                    <div className='vippopuplevel_box-reward'>
                        <span>Rewards</span>
                        <span>1,000</span>
                    </div>
                    <div className='vippopuplevel_box-reward'>
                        <span>Faucet Rewards</span>
                        <span>0.0029</span>
                    </div>
                </div>
                <div className='vippopuplevel_box'>
                    <div className='vippopuplevel_box-reward-image'>
                        <img src="./silverplate.svg" alt="bronzereward" />
                    </div>
                    <div className='vippopuplevel_box-reward'>
                        <span>Rewards</span>
                        <span>1,000</span>
                    </div>
                    <div className='vippopuplevel_box-reward'>
                        <span>Faucet Rewards</span>
                        <span>0.0029</span>
                    </div>
                </div>
                <div className='vippopuplevel_box'>
                    <div className='vippopuplevel_box-reward-image'>
                        <img src="./goldplate.svg" alt="bronzereward" />
                    </div>
                    <div className='vippopuplevel_box-reward'>
                        <span>Rewards</span>
                        <span>1,000</span>
                    </div>
                    <div className='vippopuplevel_box-reward'>
                        <span>Faucet Rewards</span>
                        <span>0.0029</span>
                    </div>
                </div>
                <div className='vippopuplevel_box'>
                    <div className='vippopuplevel_box-reward-image'>
                        <img src="./bronzeplate.svg" alt="bronzereward" />
                    </div>
                    <div className='vippopuplevel_box-reward'>
                        <span>Rewards</span>
                        <span>1,000</span>
                    </div>
                    <div className='vippopuplevel_box-reward'>
                        <span>Faucet Rewards</span>
                        <span>0.0029</span>
                    </div>
                </div>
            </div>
        </div>
            <div className='vippopup-bottom-navs'>
                <img src="./Previous.svg" alt="previous-arrow" />
                <img src="./Next.svg" alt="next-arrow" />
            </div>
        </div>
              </div>
    </div>
  );
};

export default VIPPopup;
