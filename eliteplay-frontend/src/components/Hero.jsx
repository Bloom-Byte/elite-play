import React from 'react'
import './Hero.css'

const Hero = ({isNavOpen}) => {
  return (
    <div style={{ backgroundImage: 'url("/elite-bg.svg")' }} className={`home-hero ${isNavOpen ? 'home-hero-extended' : ''}`}>
          <div  className='home-hero__txt-section'>
            <h4>Turn Playtime to Paytime</h4>
            <p>Dive into a world of incredible rewards.</p>
            <button>Sign Up Now</button>
          </div>
    </div>
  )
}

export default Hero