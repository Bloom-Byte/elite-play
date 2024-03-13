import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import './Home.css'

const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(true)

  return (
    <div>
        <Navbar isNavOpen={isNavOpen} />
        <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
    </div>
  )
}

export default Home