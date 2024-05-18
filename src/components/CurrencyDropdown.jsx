import React, { useState, useRef, useEffect  } from 'react';
import './CurrencyDropdown.css';

const CurrencyDropdown = ({balance, isOpen, setIsOpen}) => {

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
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Only attach the listener if the dropdown is open
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (isOpen) {
        // Only remove the listener if it was previously added
        window.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isOpen]);
  
  return (
    <div className="currencydropdown" ref={dropdownRef}>
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
