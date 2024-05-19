import React, { useState, useRef, useEffect } from 'react';
import './CurrencyDropdown.css';
import { isElementClassOrChildOf } from '../utils/dom';

const CurrencyDropdown = ({ balance, isOpen, setIsOpen }) => {

  const [viewInFiat, setViewInFiat] = useState(false);
  const exchangeRate = 40;
  const dropdownRef = useRef(null);

  const displayBalance = balance ? (viewInFiat ? (Number(balance) / exchangeRate).toFixed(4) : Number(balance).toFixed(4)) : '0';

  const handleToggle = () => {
    setViewInFiat(!viewInFiat);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isElementClassOrChildOf(event.target, 'nav-wallet_info') &&
        !isElementClassOrChildOf(event.target, 'currencydropdown')
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div className={`currencydropdown ${isOpen ? 'active' : ''}`} ref={dropdownRef}>
      <div className="currencydropdown-content">
        <p className="currencytitle">Currency</p>
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
          <label className="switch2">
            <input type="checkbox" checked={viewInFiat} onChange={handleToggle} />
            <span className="slider2 round2"></span>
          </label>
          <span>View in fiat</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
