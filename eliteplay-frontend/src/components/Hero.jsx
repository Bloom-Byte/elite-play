import React, { useState } from 'react'
import { isLoggedIn } from '../utils/auth'
import './Hero.css'

const Hero = ({ isNavOpen }) => {
  const [level, setLevel] = useState(0)
  const userIsLoggedIn = isLoggedIn()

  return (
    <div
      style={{ backgroundImage: 'url("/elite-bg.svg")' }}
      className={`home-hero ${isNavOpen ? 'home-hero-extended' : ''}`}
    >
      {userIsLoggedIn ? (
        <div className="home-hero__user-info">
          <h4 className="vip-progress-head">Welcome Back, Yuxeer</h4>
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
                <span className="bronze"> Bronze</span>
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
  )
}

export default Hero
