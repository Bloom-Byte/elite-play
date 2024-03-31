import React from 'react';

const CrashBeginnerComponent = ({ isNavOpen }) => {
  return (
    <div className={`dicetutorial ${isNavOpen ? 'dicetutorial-extended' : ''}`}>
      <div className="dicetutorial-hero">
        <h1>Bitcoin Crash Gambling Guide</h1>
        <img src="./crash-img.png" alt="" />
      </div>
    </div>
  );
};

export default CrashBeginnerComponent;
