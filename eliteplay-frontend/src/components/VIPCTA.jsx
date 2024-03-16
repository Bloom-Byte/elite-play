import React from 'react'
import './VIPCTA.css'
import { isLoggedIn } from '../utils/auth'

const VIPCTA = ({isNavOpen}) => {
    const userIsLoggedIn = isLoggedIn()

  return (
    <div style={{ backgroundImage: 'url("/learn-bg.svg")' }} className={`vip-cta ${isNavOpen ? 'vip-cta-extended' : ''}`}>
        <div className='vip-cta_text'>
            <h4>Join & Unlock VIP Rewards at Eliteplay</h4>
            <p>Only available in the VIP Club</p>
            <button>{userIsLoggedIn ? 'Learn More' : 'Sign Up Now'}</button>
        </div>
    </div>
  )
}

export default VIPCTA