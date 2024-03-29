import React from 'react';
import './ReferralSection.css';

const ReferralSection = ({ isNavOpen }) => {
  return (
    <div
      className={`referral-section ${
        isNavOpen ? 'referral-section-extended' : ''
      }`}
    >
      <p className="refer-dashboard">Referral Dashboard</p>
      <div className="referral-details">
        <div className="referralpot">
          <div className="referralpota">
            <img src="./pot-coin.svg" alt="coin-icon" />
            <div className="referralpota-txt">
              <span>Total Rewards</span>
              <span>eGold 0.00</span>
            </div>
          </div>
          <div className="referralpotb">
            <img src="./speaker.svg" alt="speaker" />
            <div className="referralpotb-txt">
              <span>Total Friends</span>
              <span>0</span>
            </div>
          </div>
        </div>
        <div className="referralvalue">
          <div className="referralvalue-txt">
            <span>Available Rewards</span>
            <span>eGold 0.00</span>
          </div>
          <div className="referral-btn">
            <button>Withdraw to Wallet</button>
          </div>
        </div>
      </div>
      <div className="refer-invite">
        <div className="refer-invite-txt">
          <span>INVITE A FRIEND TO GET</span>
          <span>Referral Terms & Conditions</span>
        </div>
        <hr />
        <p className="refer-commissionrewards">
          <span className="percentagecommission">25%</span> Commission Rewards
        </p>
        <p className="pinfo">
          Get up to 25% commission of casino profit from referrals. Enjoy
          consistent commissions, when they win, in our Casino. Start earning
          now!
        </p>
      </div>
      <div className="referral-cta">
        <div className="referral-cta_boxes">
          <div className="referral-cta_box">
            <p>Referral Link</p>
            <div className="referral-cta_box-info">
              <img src="./link-02.svg" alt="link-icon" />
              <span>https://eliteplay.com/yuxeer/</span>
              <img style={{marginLeft: '30px'}} src="./copy-01.svg" alt="copy-icon" />
            </div>
          </div>
          <div style={{ width: '100%' }} className="referral-cta_box">
            <p>Referral Code</p>
            <div
              style={{ width: '90%', justifyContent: 'space-between' }}
              className="referral-cta_box-info"
            >
              <div>
                <img style={{marginBottom:'-6px', marginRight:'10px'}} src="./tag-01.svg" alt="tag-icon" />
                <span>yuxeer</span>
              </div>

              <img
                style={{ alignSelf: 'flex-end' }}
                src="./copy-01.svg"
                alt="copy-icon"
              />
            </div>
          </div>
        </div>
        <div className='share-refer-link'>
          <span>Share via social media</span>
          <img src="./share-tw.svg" alt="twitter-icon" />
          <img src="./share-ig.svg" alt="ig-icon" />
          <img src="./share-wa.svg" alt="whatsapp-icon" />
          <img src="./share-te.svg" alt="telegram-icon" />
          <img src="./share-ds.svg" alt="discord-icon" />
        </div>
      </div>
    </div>
  );
};

export default ReferralSection;
