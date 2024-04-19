import React, { useState } from 'react';
import { isLoggedIn } from '../utils/auth';
import './Hero.css';

const Hero = ({ isNavOpen, user }) => {
  const [level, setLevel] = useState(0);
  const userIsLoggedIn = isLoggedIn();

  return (
    <>
      <div className="mobile__page-navigation">
        <div className="mobile-nav-box"></div>
        <div className="mobile-nav-box">
          <div className="nav-games__dice">
            <img src="./dice.svg" alt="dice-logo" />
            <span>
              <a href="/dice">Dice</a>
            </span>
          </div>
        </div>
        <div className="mobile-nav-box">
          <div className="nav-games__dice">
            <img src="./chart-increase.svg" alt="chart-logo" />
            <span>
              <a href="/crash">Crash</a>
            </span>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundImage: 'url("/elite-bg.svg")' }}
        className={`home-hero ${isNavOpen ? 'home-hero-extended' : ''}`}
      >
        {userIsLoggedIn ? (
          <div className="home-hero__user-info">
            <h4 className="vip-progress-head">Welcome Back, {user?.name}</h4>
            <div className="home-hero__user-info-box">
              <h4>VIP Progress</h4>
              <input
                className="range-level"
                type="range"
                min="0"
                max="20"
                value={level}
                onChange={(event) => setLevel(event.target.value)}
              />
              <div className="home-hero__user-info-box__level">
                <div className="hero__rank-info">
                  <span>Rank:</span>
                  <span className="bronze">{user? user.tier : 'Bronze'}</span>
                </div>
                <div className="hero__rank-info">
                  <span>Next:</span>
                  <span className="silver"> Silver</span>
                  <span className="xp"> 350XP</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="home-hero__txt-section">
            <h4>Turn Playtime to Paytime</h4>
            <p>Dive into a world of incredible rewards.</p>
            <button>Sign Up Now</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
