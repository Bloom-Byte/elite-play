import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import Hero from '../components/Hero'
import Recentwins from '../components/Recentwins'
import './Home.css'

const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(true)

  return (
    <div>
        <Navbar isNavOpen={isNavOpen} />
        <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <Hero isNavOpen={isNavOpen} />
        <Recentwins />
    </div>
  )
}

export default Home