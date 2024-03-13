import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav'>
        <div className='nav-games'>
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
            <button className='nav-auth__signin'>Sign In</button>
            <button className='nav-auth__signup'>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar