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
        <div className="footer-cta__right">
            <div className='footer-cta-items'>
                <p>Games</p>
                <a href='/dice'>Dice</a>
                <a href='/crash'>Crash</a>
            </div>
            <div className='footer-cta-items'>
                <p>Promo</p>
                <a href=''>VIP Club</a>
            </div>
            <div className='footer-cta-items'>
                <p>Support/Legal</p>
                <a href='/helpcenter'>Help Center</a>
                <a href='/helpcenter'>FAQ</a>
                <a href='/helpcenter'>Privacy Policy</a>
                <a href='/helpcenter'>Terms of Service</a>
                <a href=''>Live Support</a>
            </div>
            <div>
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
