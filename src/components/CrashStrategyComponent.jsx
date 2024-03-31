import React from 'react';

const CrashStrategyComponent = ({ isNavOpen }) => {
  return (
    <div  className={`dicetutorial ${isNavOpen ? 'dicetutorial-extended' : ''}`}>
      <div className="dicetutorial-hero">
        <h1>Crash Gambling Strategy Guide: How to Win at Crash Gambling Game | Winning strategy</h1>
        <img src="./crash-img.png" alt="" />
      </div>
    </div>
  );
};

export default CrashStrategyComponent;
