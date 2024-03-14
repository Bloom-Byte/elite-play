import React from 'react'
import './Navbar.css'

const Navbar = ({isNavOpen}) => {
  return (
    <div className='nav'>
        <div className={`nav-games ${isNavOpen ? 'nav-expanded' : ''}`}>
            <div className='nav-games__dice'>
                <img src="./dice.svg" alt="dice-logo" />
                <span>Dice</span>
            </div>
            <div className='nav-games__dice'>
                <img src="./chart-increase.svg" alt="chart-logo" />
                <span>Crash</span>
            </div>
        </div>
        <div className='nav-auth'>
            <a href='/login'><button className='nav-auth__signin'>Sign In</button></a>
            <a href='/register'><button className='nav-auth__signup'>Sign Up</button></a>
        </div>
    </div>
  )
}

export default Navbar