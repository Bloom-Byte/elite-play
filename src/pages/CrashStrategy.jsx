import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import CrashStrategyComponent from '../components/CrashStrategyComponent';
import Footer from '../components/Footer';

const CrashStrategy = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <CrashStrategyComponent isNavOpen={isNavOpen} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  );
};

export default CrashStrategy;
