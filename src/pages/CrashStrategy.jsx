import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import CrashStrategyComponent from '../components/CrashStrategyComponent';
import Footer from '../components/Footer';

const CrashStrategy = () => {
  const [isNavOpen, setIsNavOpen] = useState(true)
  
  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <CrashStrategyComponent isNavOpen={isNavOpen} />
    </div>
  );
};

export default CrashStrategy;
