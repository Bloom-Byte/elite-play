import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';

const DiceAutomation = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
    </div>
  );
};

export default DiceAutomation;
