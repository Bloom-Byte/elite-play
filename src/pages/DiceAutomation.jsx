import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import DiceAutomationComponent from '../components/DiceAutomationComponent';

const DiceAutomation = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <DiceAutomationComponent isNavOpen={isNavOpen} />
    </div>
  );
};

export default DiceAutomation;
