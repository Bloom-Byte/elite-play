import React from 'react'
import './DiceGame.css'

const DiceGame = ({ isNavOpen }) => {
  return (
    <div className={`dicegame ${isNavOpen ? 'dicegame-extended' : ''}`}>
      <div className="dicegame-buttons">
        <button className='dicegame-dice-title'>Dice</button>
        <button> <img className='dicegame-fairnesslogo' src="./fairness.svg" alt="fairness" /> Fairness Checker</button>
        <button> <img src="./Exclude.svg" alt="" /> Live Games</button>
      </div>
      <div className="dicegame-gamesection">
        <div className="dicegame-placebet">
          <div className="dicegame-placebet_type">
            <span className="active">Manual</span>
            <span>Auto</span>
          </div>
          <div className="dicegame-placebet__bet">
            <p>Amount</p>
            <div className="dicegame-placebet__amount">
              <span>
                <img src="./twemoji_coin.svg" alt="coin" />
                10
              </span>
              <div className="dicegame-placebet__amonut-toggle">
                <span>/2</span>
                <span>2</span>
              </div>
            </div>
            <div className="dicegame-placebet__select-amount">
              <span>10</span>
              <span>100</span>
              <span>1000</span>
              <span>10000</span>
            </div>
            <p>Win Amount</p>
            <div className="dicegame-placebet__amount">
              <span>
                <img src="./twemoji_coin.svg" alt="coin" />
                10
              </span>
            </div>
            <button className='dicegame-rollnow'>Roll Now</button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default DiceGame
