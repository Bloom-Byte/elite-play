import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import DiceBeginnerComponent from '../components/DiceBeginnerComponent';

const DiceBeginner = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <DiceBeginnerComponent isNavOpen={isNavOpen} />
        <Footer isNavOpen={isNavOpen} />
    </div>
  );
};

export default DiceBeginner;
