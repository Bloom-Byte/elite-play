import React from 'react';
import './DepositPopup.css';

const DepositPopup = ({ depositPopupOpen, setDepositPopupOpen }) => {
  return (
    <div className="depositpopup">
      <div className="depositpopup-content">
        <div className="depositpopup-header">
          <h3>Deposit</h3>
          <img
            onClick={() => {
              setDepositPopupOpen(!depositPopupOpen);
            }}
            src="./cancel-x.svg"
            alt="cancel-close"
          />
        </div>
        <div className="depositpopup-boxes">
          <div className="depositpopup-box">
            <p>Deposit Currency</p>
            <select name="" id="">
              <img src="./twemoji_coin.svg" alt="coin" />
              <option value="egold">eGold</option>
            </select>
          </div>
          <div className="depositpopup-box">
            <p>Choose Network</p>
            <select name="" id="">
              <option value="erc20">Normal Deposit</option>
            </select>
          </div>
        </div>
        <div className="deposit-details">
          <p>Deposit Address</p>
          <div className="deposit-address">
            <span className="eg-address">
              <span className="eAddress">0x67</span>
              8bD9B31a318af10bb0897905E425dBb
              <span className="eAddress">Ce5A794</span>
            </span>
            <span className="copy-bx">
              <img src="./copy-01.svg" alt="" /> copy
            </span>
          </div>
        </div>
        <div className="depositpopup-min">
          <img src="./alert-01.svg" alt="alert-icon" />
          <span>Minimum Deposit: 1 eGold</span>
        </div>
        <div className="depositpopup-notice">
          <span className='notice-txt'>NOTICE: </span>{' '}
          <span>
          If your eGold deposit has not been processed within 10 minutes, please contact our support team!
          </span>
        </div>
      </div>
    </div>
  );
};

export default DepositPopup;
