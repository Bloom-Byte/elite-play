import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import CrashAutomationComponent from '../components/CrashAutomationComponent';
import Footer from '../components/Footer';

const CrashAutomation = () => {
  const [isNavOpen, setIsNavOpen] = useState(true)
  
  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <CrashAutomationComponent isNavOpen={isNavOpen} />
    </div>
  );
};

export default CrashAutomation;
