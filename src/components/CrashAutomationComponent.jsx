import React from 'react';

const CrashAutomationComponent = ({ isNavOpen }) => {
  return (
    <div className={`dicetutorial ${isNavOpen ? 'dicetutorial-extended' : ''}`}>
      <div className="dicetutorial-hero">
        <h1>Best Crash Gambling Scripts</h1>
        <img src="./crash-img.png" alt="" />
      </div>
    </div>
  );
};

export default CrashAutomationComponent;
