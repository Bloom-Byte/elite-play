import React from 'react'
import './Footer.css'

const Footer = ({ isNavOpen }) => {
  return (
    <div className={`footer ${isNavOpen ? 'footer-extended' : ''}`}>
      <h4>Sponsorship and Gaming Responsibilities</h4>
      <div className="footer-sponsor">
        <img src="./sponsor-1.png" alt="" />
        <img src="./sponsor-6.png" alt="" />
        <img src="./sponsor-4.png" alt="" />
        <img src="./sponsor-2.png" alt="" />
        <img src="./sponsor-7.png" alt="" />
        <img src="./sponsor-3.png" alt="" />
        <img src="./sponsor-8.png" alt="" />
        <img src="./sponsor-5.png" alt="" />
      </div>
      <div className="footer-cta">
        <div className="footer-cta__left">
          <a href="/">
            {' '}
            <img src="./eliteplay.svg" alt="logo" />
          </a>
          <p>
            Eliteplay beckons you into a world of thrilling dice games and
            pulse-pounding crash experiences, where every roll and every tick of
            the clock holds the potential for epic rewards. Test your mettle in
            classic dice challenges, or feel the surge of adrenaline as you
            navigate the ever-increasing multiplier in our crash games.
          </p>
        </div>
        <div className="footer-cta__right"></div>
      </div>
    </div>
  )
}

export default Footer
