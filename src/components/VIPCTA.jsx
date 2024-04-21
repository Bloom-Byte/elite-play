import React from 'react'
import { useNavigate } from 'react-router-dom';
import './VIPCTA.css'
import { isLoggedIn } from '../utils/auth'

const VIPCTA = ({isNavOpen}) => {
    const userIsLoggedIn = isLoggedIn()
    const navigate = useNavigate();

    const handleVIPClick = () => {
      if (userIsLoggedIn) {
        navigate('/');
      } else {
        navigate('/register');
      }
    };

  return (
    <div style={{ backgroundImage: 'url("/learn-bg.svg")' }} className={`vip-cta ${isNavOpen ? 'vip-cta-extended' : ''}`}>
        <div className='vip-cta_text'>
            <h4>Join & Unlock VIP Rewards at Eliteplay</h4>
            <p>Only available in the VIP Club</p>
            <button onClick={handleVIPClick}>{userIsLoggedIn ? 'Learn More' : 'Sign Up Now'}</button>
        </div>
    </div>
  )
}

export default VIPCTA