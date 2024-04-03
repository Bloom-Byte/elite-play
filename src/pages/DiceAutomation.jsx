import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import DiceAutomationComponent from '../components/DiceAutomationComponent';

const DiceAutomation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <DiceAutomationComponent isNavOpen={isNavOpen} />
        <Footer isNavOpen={isNavOpen} />
    </div>
  );
};

export default DiceAutomation;
