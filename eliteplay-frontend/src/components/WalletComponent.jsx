import React from 'react';
import './WalletComponent.css';

const WalletComponent = ({ isNavOpen }) => {
  return (
    <div className={`wallet-comp ${isNavOpen ? 'wallet-comp-extended' : ''}`}>
      <button className="wallet-header">Wallet</button>
      <div className="wallet-comps">
        <div className="wallet-comp_wallet-options">
          <div className="wallet-option">
            <img src="./wallet-02.svg" alt="wallet" />
            <span>Balance</span>
          </div>
          <div className="wallet-option">
            <img src="./money-receive-01.svg" alt="wallet" />
            <span>Deposit</span>
          </div>
          <div className="wallet-option">
            <img src="./bitcoin-withdraw.svg" alt="wallet" />
            <span>Withdraw</span>
          </div>
          <div className="wallet-option">
            <img src="./coins-01.svg" alt="wallet" />
            <span>Earnings</span>
          </div>
          <div className="wallet-option">
            <img src="./bitcoin-transaction.svg" alt="wallet" />
            <span>Transaction</span>
          </div>
        </div>
        <div className="wallet-comp_wallet-info">
          <div className="wallet-comp_wallet-balance">
            <div className="pot-info">
              <img src="./pot-coin.svg" alt="" />
              <div className="pot-balance">
                <span className="real-balance">Total Balance</span>
                <span className="real-balance_amount">USD 300.00</span>
              </div>
            </div>
            <hr />
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
            <div className="mainBalance_hide">
              <span>Hide 0 Balance</span>
              <input type="text" placeholder="Search" />
            </div>
            <p>Fiat Currency</p>
            <div className="mainBalance-fiat-currency">
              <div className='currency-title'>
                <img src="./cryptocurrency-color_usd.svg" alt="crypto" />
                <span>USD</span>
              </div>
              <div className='mainBalance-amount'>
                <span>20.00</span>
                <span>Deposit</span>
                <span>Withdraw</span>
              </div>
            </div>
            <p>Cryptocurrency</p>
            <div className="mainBalance-fiat-currency">
              <div className='currency-title'>
                <img src="./twemoji_coin.svg" alt="crypto" />
                <span>eGold</span>
              </div>
              <span className='crypto-amount-balance'>300.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;
