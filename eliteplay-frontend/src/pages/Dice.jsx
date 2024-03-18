import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import DiceGame from '../components/DiceGame'
import './Dice.css'

const Dice = () => {
    const [isNavOpen, setIsNavOpen] = useState(true)

  return (
    <div>
         <Navbar isNavOpen={isNavOpen} />
        <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <DiceGame isNavOpen={isNavOpen} />
    </div>
  )
}

export default Dice