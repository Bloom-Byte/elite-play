import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import DiceStrategyComponent from '../components/DiceStrategyComponent';

const DiceStrategy = () => {

  return (
    <div style={{
      padding: '0 20px',
    }}>
      <DiceStrategyComponent />
    </div>
  );
};

export default DiceStrategy;
