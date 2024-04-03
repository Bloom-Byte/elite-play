import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import HelpCenterSection from '../components/HelpCenterSection';
import Footer from '../components/Footer';

const HelpCenter = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div>
      <Navbar isNavOpen={isNavOpen} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <HelpCenterSection isNavOpen={isNavOpen} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  );
};

export default HelpCenter;
