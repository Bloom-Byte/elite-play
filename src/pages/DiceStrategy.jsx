import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import DiceStrategyComponent from '../components/DiceStrategyComponent';

const DiceStrategy = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <DiceStrategyComponent isNavOpen={isNavOpen} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  );
};

export default DiceStrategy;
