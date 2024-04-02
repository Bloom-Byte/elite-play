import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import CrashBeginnerComponent from '../components/CrashBeginnerComponent';
import Footer from '../components/Footer';

const CrashBeginner = () => {
  const [isNavOpen, setIsNavOpen] = useState(true)

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <CrashBeginnerComponent isNavOpen={isNavOpen} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  );
};

export default CrashBeginner;
