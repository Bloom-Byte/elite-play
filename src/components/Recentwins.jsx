import React from 'react';
import './Recentwins.css';

const Recentwins = ({ isNavOpen, diceAllBets, crashAllBets }) => {
    const diceRecentwins = diceAllBets.length > 0 ? diceAllBets.filter(
        (bet) => bet.data.betStatus === 'win'
      ) : [];
      
      const crashRecentwins = crashAllBets.length > 0 ? crashAllBets.filter(
        (bet) => bet.data.betStatus === 'win'
      ) : [];
  return (
    <div className={`recent-wins ${isNavOpen ? 'recent-wins__extended' : ''}`}>
      <div className="recent-wins__title">
        <div className="active-wins"> </div>
        <h4>Recent Wins</h4>
      </div>
      <div className="recent-wins__container">
        {diceRecentwins.length > 0 &&
          diceRecentwins.slice(0, 5).map((dice, index) => (
            <div id={index} className="recent-wins__container__item">
              <img src="./dice-win.svg" alt="dice-win" />
              <div className="recent-wins__coin-info">
                <img src="./twemoji_coin.svg" alt="" />
                <span>{dice.username}</span>
              </div>
              <p className="recent-wins__egold">eGold {dice.winAmount}</p>
            </div>
          ))}
        {crashRecentwins.length > 0 &&
          crashRecentwins.slice(0, 5).map((crash, index) => (
            <div id={index} className="recent-wins__container__item">
              <img src="./crash-win.svg" alt="dice-win" />
              <div className="recent-wins__coin-info">
                <img src="./twemoji_coin.svg" alt="" />
                <span>{crash.username}</span>
              </div>
              <p className="recent-wins__egold">eGold {crash.winAmount}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recentwins;
