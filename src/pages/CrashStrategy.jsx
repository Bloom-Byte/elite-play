import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import CrashStrategyComponent from '../components/CrashStrategyComponent';
import Footer from '../components/Footer';

const CrashStrategy = () => {

  return (
    <div style={{
      padding: '0 20px',
    }}>
      <CrashStrategyComponent />
    </div>
  );
};

export default CrashStrategy;
