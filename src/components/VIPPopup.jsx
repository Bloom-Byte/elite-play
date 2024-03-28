import React from 'react';
import './VIPPopup.css';

const VIPPopup = ({vipSupport, setVipSupport}) => {
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
                <p className='reward-details'>Total Reward Claimed <span className='coinamount'>0.0029</span> <span>Nest Reward in: <span className='nextrewardtime'>10m</span></span></p>
                <button className='vippopup-claimreward-btn'>Claim Reward</button>
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
