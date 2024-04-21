import React, { useState } from 'react';
import './CurrencyDropdown.css';

const CurrencyDropdown = ({balance}) => {

  const [viewInFiat, setViewInFiat] = useState(false);
  const exchangeRate = 40;

  const displayBalance = viewInFiat ? (balance / exchangeRate).toFixed(2) : balance.toFixed(2);

  const handleToggle = () => {
    setViewInFiat(!viewInFiat);
  };
  
  return (
    <div className="currencydropdown">
      <div className="currencydropdown-content">
        <p className="currencytitle">Currencys</p>
        <div className="currencydropdown-details">
          <div className="currencydropdown-coin">
            <img src="./twemoji_coin.svg" alt="coin" />
            <span>eGold</span>
          </div>
          <div className="currencydropdown-amount">
          <span>{viewInFiat ? `USD ${displayBalance}` : `${displayBalance}`}</span>
          </div>
        </div>
        <div className='togglecurrencyview'>
          <label class="switch2">
            <input type="checkbox" checked={viewInFiat} onChange={handleToggle} />
            <span class="slider2 round2"></span>
          </label>
          <span>View in fiat</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
