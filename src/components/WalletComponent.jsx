import React, { useState } from 'react';
import './WalletComponent.css';
import icon1 from '../assets/usdt.svg';
import icon2 from '../assets/solana.svg';
import CustomDropdown from './CustomDropdown';

const options = [
  { text: 'USDT', value: 'usdt', icon: icon1 },
  { text: 'SOL', value: 'solana', icon: icon2 },
  // Add more options as needed
];

const WalletComponent = ({ isNavOpen }) => {
  const [currentSection, setCurrentSection] = useState('Balance');
  const [mobileNav, setMobileNav] = useState(false);
  const [withdrawalAddress, setWithdrawalAddress] = useState('')
  const [withdrawalAmount, setWithdrawalAmount] = useState(0)

  const copyToClipboard = (text) => {
    const tempInput = document.createElement("input");
    tempInput.value = text;

    document.body.appendChild(tempInput);

    tempInput.select();

    document.execCommand("copy");

    document.body.removeChild(tempInput);

    alert("Copied to clipboard: " + text);
};

async function initiateWithdrawal() {
  const url = 'https://api.example.com/withdraw-transaction';
  const accessToken = '{{elitePlayAccessToken}}'; // Replace with your actual access token

  const requestBody = {
    amount: 4,
    eliteUserId: 8727757
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestBody)
    });

    if (response.status === 201) {
      const responseData = await response.json();
      console.log('Transaction initiated successfully:', responseData);
      // Handle successful response here
    } else {
      console.error('Failed to initiate transaction:', response.statusText);
      // Handle error response here
    }
  } catch (error) {
    console.error('Error occurred while initiating transaction:', error);
    // Handle network errors or other exceptions here
  }
}

  return (
    <div className={`wallet-comp ${isNavOpen ? 'wallet-comp-extended' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="wallet-setting-header">
          <span>Wallet</span>
        </div>
        <div
          onClick={() => {
            setMobileNav(!mobileNav);
          }}
          className="accountsettings-mobile_nav"
        >
          <img src="./slant-menu.svg" alt="" />
        </div>
      </div>

      <div className="wallet-comps">
        <div className="wallet-comp_wallet-options">
          <div
            onClick={() => setCurrentSection('Balance')}
            className={`wallet-option ${
              currentSection === 'Balance' ? 'wallet-option_active' : ''
            }`}
          >
            <img src="./wallet-02.svg" alt="wallet" />
            <span>Balance</span>
          </div>
          <div
            onClick={() => setCurrentSection('Deposit')}
            className={`wallet-option ${
              currentSection === 'Deposit' ? 'wallet-option_active' : ''
            }`}
          >
            <img src="./money-receive-01.svg" alt="wallet" />
            <span>Deposit</span>
          </div>
          <div
            onClick={() => setCurrentSection('Withdraw')}
            className={`wallet-option ${
              currentSection === 'Withdraw' ? 'wallet-option_active' : ''
            }`}
          >
            <img src="./bitcoin-withdraw.svg" alt="wallet" />
            <span>Withdraw</span>
          </div>
          <div className="wallet-option">
            <img src="./coins-01.svg" alt="wallet" />
            <span>Earnings</span>
          </div>
          <div
            onClick={() => setCurrentSection('Transaction')}
            className={`wallet-option ${
              currentSection === 'Transaction' ? 'wallet-option_active' : ''
            }`}
          >
            <img src="./bitcoin-transaction.svg" alt="wallet" />
            <span>Transaction</span>
          </div>
        </div>
        <div className="wallet-comp_wallet-info">
          {currentSection === 'Balance' && (
            <div>
              <div className="wallet-comp_wallet-balance">
                <div className="pot-info">
                  <img src="./pot-coin.svg" alt="" />
                  <div className="pot-balance">
                    <span className="real-balance">Total Balance</span>
                    <span className="real-balance_amount">USD 300.00</span>
                  </div>
                 
                </div>
                <hr className='potline' />
                <div className="pot-balance">
                  <span>Real Balance</span>
                  <span>USD 300.00</span>
                </div>
                <div className="pot-balance">
                  <span>Bonus Balance</span>
                  <span>USD 300.00</span>
                </div>
              </div>
              <div className="mainBalance-section">
                <div className="mainBalance-fiat-currency">
                  <div className="currency-title">
                    <img src="./twemoji_coin.svg" alt="crypto" />
                    <span>eGold</span>
                  </div>
                  <div className="mainBalance-amount">
                    <span>300.00</span>
                    <span style={{cursor: 'pointer'}} onClick={() => setCurrentSection('Deposit')}>Deposit</span>
                    <span style={{cursor: 'pointer'}} onClick={() => setCurrentSection('Withdraw')}>Withdraw</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentSection === 'Deposit' && (
            <div className="wallet-deposit">
                <div className="deposit-wallet_main">
                  <div>
                    <div className="crypto-deposit-method_type">
                      <div>
                        <p>Deposit Currency</p>
                        <select className="options-list">
                          <option value="usdt">eGold</option>
                        </select>
                      </div>
                      <div>
                        <p>Choose Network</p>
                        <select className="options-list">
                          <option value="erc20">ERC 20</option>
                        </select>
                      </div>
                    </div>
                    <p>Deposit Amount</p>
                    <div className="withdraw-address-box">
                      <input className="withdraw-address_input" type="text" />
                    </div>
                    <div className="deposit-crypto">
                      <img src="./alert-01.svg" alt="alert-icon" />
                      <span>Minimum Deposit: 50 eGold</span>
                    </div>
                    {/* <div className="crypto-notice">
                      <span className="crypto-notice_notice-head">
                        NOTICE:{' '}
                      </span>
                      <span className="crypto-notice_notice-info">
                        Send only USDT to this deposit address. Coins will be
                        deposited automatically after 20 network confirmations. 
                      </span>
                    </div> */}
                  </div>
                </div>
            </div>
          )}

          {currentSection === 'Withdraw' && (
            <div className="wallet-deposit">
                <div className="deposit-wallet_main">
                  <div>
                    <div className="crypto-deposit-method_type">
                      <div>
                        <p>Withdraw Currency</p>
                        <select className="options-list">
                          <option value="usdt">eGold</option>
                        </select>
                      </div>
                      <div>
                        <p>Choose Network</p>
                        <select className="options-list">
                          <option value="erc20">ERC 20</option>
                        </select>
                      </div>
                    </div>
                    {/* <p>Withdrawal Address</p>
                    <div className="withdraw-address-box">
                      <input
                        className="withdraw-address_input"
                        type="text"
                        placeholder="Fill in carefully according to the specefied currency"
                      />
                    </div> */}
                    <div className="withdraw-amount_title">
                      <p>Withdraw Amount</p>
                      <p>MIN: 50 eGold</p>
                    </div>

                    <div className="withdraw-address-box">
                      <input className="withdraw-address_input" type="text" />
                    </div>
                    <div className="withdraw_amounts">
                      <div className="withdraw_amount-details">
                        <span>Withdraw Amount:</span>
                        <span>0.00 eGold</span>
                      </div>
                      <div className="withdraw_amount-details">
                        <span>
                          Fee:{' '}
                          <img
                            className="more-info_icon"
                            src="./help-circle.svg"
                            alt=""
                          />
                        </span>
                        <span>0.00 eGold</span>
                      </div>
                      <div className="withdraw_amount-details">
                        <span>Total Withdraw Amount:</span>
                        <span>0.00 eGold</span>
                      </div>
                    </div>

                    <div className="crypto-notice">
                      <span className="crypto-notice_notice-head">
                        NOTICE:{' '}
                      </span>
                      <span className="crypto-notice_notice-info">
                        For security purposes, large or suspicious withdrawal
                        may take 1-3 hours for audit process. We appreciate your
                        patience! 
                      </span>
                    </div>
                    <div className="deposit_fiat-btn">
                      <button>Withdraw</button>
                    </div>
                  </div>
                </div>
            </div>
          )}
          {currentSection === 'Transaction' && (
            <div className="transaction-section">
              <div className="transaction-filters">
                <select name="" id="">
                  <option value="deposit">Deposit</option>
                  <option value="withdraw">Withdraw</option>
                  <option value="withdraw">All Bets</option>
                </select>
                <select name="" id="">
                  <option value="">Past 60 days</option>
                  <option value="">Past 24 hours</option>
                  <option value="">Past 7 days</option>
                  <option value="">Past 30 days</option>
                  <option value="">Past 90 days</option>
                  <option value="">Custom</option>
                </select>
                <select name="" id="">
                  <option value="">All Status</option>
                  <option value="">Complete</option>
                  <option value="">Processing</option>
                  <option value="">Failed</option>
                  <option value="">Canceled</option>
                </select>
              </div>
              <div className="transaction-main_section">
                <div className="no-transanction-img_container">
                  <img src="./_x31_.png" alt="no-transanction_image" />
                </div>
                <p className="no-data_txt">Oops! There is no data yet!</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {mobileNav && (
        <div className="settings-dropdown">
          <div className="settings-dropdown-content">
            <div
              onClick={() => {
                setCurrentSection('Balance');
              }}
              className="settings-dropdown-cta"
            >
              <img src="./wallet-02.svg" alt="wallet" />
              <span>Balance</span>
            </div>
            <div
              onClick={() => {
                setCurrentSection('Deposit');
              }}
              className="profile-dropdown-cta"
            >
              <img src="./money-receive-01.svg" alt="wallet" />
              <span>Deposit</span>
            </div>
            <div
              onClick={() => {
                setCurrentSection('Withdraw');
              }}
              className="profile-dropdown-cta"
            >
              <img src="./bitcoin-withdraw.svg" alt="wallet" />
              <span>Withdraw</span>
            </div>
            <div
              onClick={() => {
                setCurrentSection('Withdraw');
              }}
              className="profile-dropdown-cta"
            >
              <img src="./coins-01.svg" alt="wallet" />
              <span>Earnings</span>
            </div>
            <div
              onClick={() => {
                setCurrentSection('Transaction');
              }}
              className="profile-dropdown-cta"
            >
              <img src="./bitcoin-transaction.svg" alt="wallet" />
              <span>Transaction</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletComponent;
