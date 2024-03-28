import React from 'react';
import './CurrencyDropdown.css';

const CurrencyDropdown = () => {
  return (
    <div className="currencydropdown">
      <div className="currencydropdown-content">
        <div className="currency__box">
          <img src="./Search.svg" alt="search-icon" />
          <input type="text" placeholder="Search for help" />
        </div>
        <p className="currencytitle">Crypto</p>
        <div className="currencydropdown-details">
          <div className="currencydropdown-coin">
            <img src="./twemoji_coin.svg" alt="coin" />
            <span>eGold</span>
          </div>
          <div className="currencydropdown-amount">
            <span>USD 0.00</span>
            <span>0.00</span>
          </div>
        </div>
        <div className='togglecurrencyview'>
          <label class="switch2">
            <input type="checkbox" />
            <span class="slider2 round2"></span>
          </label>
          <span>View in fiat</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
