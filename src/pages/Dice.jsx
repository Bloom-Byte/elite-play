import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import DiceGame from '../components/DiceGame'
import DiceTable from '../components/DiceTable'
import Footer from '../components/Footer'
import './Dice.css'

const Dice = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <DiceGame isNavOpen={isNavOpen} />
      <DiceTable isNavOpen={isNavOpen} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  )
}

export default Dice
