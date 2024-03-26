import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import AccountSettingsSection from '../components/AccountSettingsSection'
import Footer from '../components/Footer'
import './AccountSettings.css'

const AccountSettings = () => {
    const [isNavOpen, setIsNavOpen] = useState(true)

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <AccountSettingsSection isNavOpen={isNavOpen} />

      <Footer isNavOpen={isNavOpen} />

    </div>
  )
}

export default AccountSettings