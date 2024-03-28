import React, { useState } from 'react'
import { isLoggedIn } from '../utils/auth';
import ProfileDropdown from './ProfileDropdown';
import './Navbar.css';

const Navbar = ({ isNavOpen }) => {
  const userIsLoggedIn = isLoggedIn();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <>
    <div className="nav">
      <div className={`nav-games ${isNavOpen ? 'nav-expanded' : ''}`}>
        <div className="nav-games__dice">
          <img src="./dice.svg" alt="dice-logo" />
          <span>
            <a href="/dice">Dice</a>
          </span>
        </div>
        <div className="nav-games__dice">
          <img src="./chart-increase.svg" alt="chart-logo" />
          <span>
            <a href="/crash">Crash</a>
          </span>
        </div>
      </div>
      {userIsLoggedIn ? (
        <div>
          <div className="nav-loggedin">
            <div className="nav-wallet">
              <div className="nav-wallet_info">
                <img src="./twemoji_coin.svg" alt="coin" />
                <span>0.00000</span>
                <img src="./down-arrow.svg" alt="arrow" />
              </div>
              <a className='wallet-nav' href="/wallet">
                <div className="nav-wallet_deposit">
                  <img src="./wallet-02.svg" alt="deposit" />
                  <span>Deposit</span>
                </div>
              </a>
            </div>
            <div>
              <img src="./not-bell.svg" alt="notification icon" />
            </div>
            <div onClick={()=> {
              setIsProfileDropdownOpen(!isProfileDropdownOpen);
            }} className="nav-profile">
              <img src="./profile-img.svg" alt="profile-img" />
              <img src="./down-arrow.svg" alt="arrow" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="nav-auth">
            <a href="/login">
              <button className="nav-auth__signin">Sign In</button>
            </a>
            <a href="/register">
              <button className="nav-auth__signup">Sign Up</button>
            </a>
          </div>
        </>
      )}
    </div>
    {isProfileDropdownOpen && <ProfileDropdown />}

    </>
    
  );
};

export default Navbar;
