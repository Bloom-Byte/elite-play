import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import Hero from '../components/Hero'
import Recentwins from '../components/Recentwins'
import DepositCTA from '../components/DepositCTA'
import Livebets from '../components/Livebets'
import VIPCTA from '../components/VIPCTA'
import './Home.css'

const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(true)

  return (
    <div>
        <Navbar isNavOpen={isNavOpen} />
        <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <Hero isNavOpen={isNavOpen} />
        <Recentwins isNavOpen={isNavOpen} />
        <DepositCTA isNavOpen={isNavOpen} />
        <Livebets isNavOpen={isNavOpen} />
        <VIPCTA isNavOpen={isNavOpen} />
    </div>
  )
}

export default Home