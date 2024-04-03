import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import CrashGame from '../components/CrashGame'
import CrashTable from '../components/CrashTable'
import Footer from '../components/Footer'
import './Crash.css'

const Crash = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <CrashGame isNavOpen={isNavOpen} />
      <CrashTable isNavOpen={isNavOpen} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  )
}

export default Crash
