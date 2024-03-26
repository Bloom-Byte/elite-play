import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import WalletComponent from '../components/WalletComponent';
import Footer from '../components/Footer';
import './Wallet.css';

const Wallet = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <WalletComponent isNavOpen={isNavOpen} />
        <Footer isNavOpen={isNavOpen} />
    </div>
  );
};

export default Wallet;
