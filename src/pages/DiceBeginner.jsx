import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import DiceBeginnerComponent from '../components/DiceBeginnerComponent';

const DiceBeginner = () => {
  return (
    <div style={{
      padding: '0 20px',
    }}>
      <DiceBeginnerComponent />
    </div>
  );
};

export default DiceBeginner;
