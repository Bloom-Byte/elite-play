import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className={`footer`}>
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
          <Link to="/">
            {' '}
            <img src="./eliteplay.svg" alt="logo" />
          </Link>
          <p>
            Eliteplay beckons you into a world of thrilling dice games and
            pulse-pounding crash experiences, where every roll and every tick of
            the clock holds the potential for epic rewards. Test your mettle in
            classic dice challenges, or feel the surge of adrenaline as you
            navigate the ever-increasing multiplier in our crash games.
          </p>
        </div>
        <div className="footer-cta__right">
            <div className='footer-cta-items'>
                <p>Games</p>
                <Link to='/dice'>Dice</Link>
                <Link to='/crash'>Crash</Link>
            </div>
            <div className='footer-cta-items'>
                <p>Promo</p>
                <Link to=''>VIP Club</Link>
            </div>
            <div className='footer-cta-items'>
                <p>Support/Legal</p>
                <Link to='/helpcenter'>Help Center</Link>
                <Link to='/helpcenter'>FAQ</Link>
                <Link to='/helpcenter'>Privacy Policy</Link>
                <Link to='/helpcenter'>Terms of Service</Link>
                <Link to=''>Live Support</Link>
            </div>
            <div className='footer-cta-items-social'>
                <p>Community</p>
                <div className='social-icons'>
                    <img src="./facebook.svg" alt="facebook-icon" />
                    <img src="./x.svg" alt="x-icon" />
                    <img src="./linkedin.svg" alt="linkedin-icon" />
                    <img src="./youtube.svg" alt="youtube-icon" />
                    <img src="./instagram.svg" alt="instagram-icon" />
                    <img src="./discord.svg" alt="discord-icon" />
                </div>
            </div>
        </div>
      </div>
      <p className='copyright'>©2024 ELITEPLAY ALL RIGHTS RESERVED</p>
    </div>
  )
}

export default Footer
