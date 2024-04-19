import React, { useState } from 'react';
import axios from 'axios';
import './DiceGame.css';

const DiceGame = ({ isNavOpen }) => {
  const [auto, setAuto] = useState(false);
  const [fairness, setFairness] = useState(false);
  const [livebet, setLivebet] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const [diceRoll, setDiceRoll] = useState(50);
  const [betAmount, setBetAmount] = useState(10);

  const handleChange = (event) => {
    if (event.target.value >= 5 && event.target.value <= 96) {
      setDiceRoll(event.target.value);
    }
  };

  const handleBetAmount = (event) => {
    if (event.target.value >= 1) {
      setBetAmount(event.target.value);
    }
  };

  const accessToken = localStorage.getItem('accessToken');

  function placeBet() {
    const url = `https://be.eliteplay.bloombyte.dev/game/place-bet`;
    const pay = Number((100 / diceRoll).toFixed(4))

    const data = {
      amount: betAmount,
      isRollOver: false,
      targetValue: diceRoll,
      payout: pay
    };
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };
  
    axios.post(url, data, { headers })
      .then(response => {
        if (response.status === 201) {
          console.log('Bet placed:', response.data);
        } else {
          throw new Error('Failed to place bet');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className={`dicegame ${isNavOpen ? 'dicegame-extended' : ''}`}>
      <div className="dicegame-buttons">
        <button className="dicegame-dice-title">Dice</button>
        <button
          onClick={() => {
            setLivebet(!livebet);
          }}
        >
          {' '}
          <img src="./Exclude.svg" alt="" /> Live Games
        </button>
        <button
          onClick={() => {
            setFairness(!fairness);
          }}
        >
          {' '}
          <img
            className="dicegame-fairnesslogo"
            src="./fairness.svg"
            alt="fairness"
          />{' '}
          Fairness Checker
        </button>
        <button
          onClick={() => {
            setTutorial(!tutorial);
          }}
        >
          {' '}
          <img
            className="dicegame-fairnesslogo"
            src="./book-open-01.svg"
            alt="fairness"
          />{' '}
          Tutorial
        </button>
      </div>
      <div className="dicegame-gamesection">
        <div className="dicegame-placebet">
          <div className="dicegame-placebet_type">
            <span
              onClick={() => {
                setAuto(false);
              }}
              className={`${!auto ? 'active' : ''}`}
            >
              Manual
            </span>
            <span
              className={`${auto ? 'active' : ''}`}
              onClick={() => {
                setAuto(true);
              }}
            >
              Auto
            </span>
          </div>
          {auto ? (
            <div className="dicegame-placebet__bet">
              <p>Amount</p>
              <div className="dicegame-placebet__amount">
                  <div className="dicegame-placebet__amount-display">
                    <img src="./twemoji_coin.svg" alt="coin" />
                    <input type="text" value={betAmount} onChange={handleBetAmount} />
                  </div>
                  <div className="dicegame-placebet__amount-toggle">
                    <span style={{cursor: 'pointer'}} onClick={() => {setBetAmount(betAmount/2)}}>/2</span>
                    <span style={{cursor: 'pointer'}} onClick={() => {setBetAmount(betAmount*2)}}>2</span>
                    <div className="count-arrows">
                      <img style={{cursor: 'pointer'}} onClick={() => {setBetAmount(betAmount+1)}} src="./count_arrow-top.svg" alt="" />
                      <img style={{cursor: 'pointer'}} onClick={() => {setBetAmount(betAmount-1)}} src="./count_arrow-down.svg" alt="" />
                    </div>
                  </div>
                </div>
              <p style={{marginTop: '1rem'}}>Number of Bets</p>
              <div className="mrg-b dicegame-placebet__amount">
                <span>&infin;</span>
                <div className="dicegame-placebet__amonut-toggle">
                  <span>&infin;</span>
                  <span>10</span>
                  <span>100</span>
                </div>
              </div>
              <p>On win</p>
              <div className="dicegame-onwin">
                <div className="gamedice-reset_btn">
                  <span className="dicegame-reset-bx">Reset</span>
                  <span className="dicegame-increase">Increase by</span>
                </div>
                <div className="dicegame-pecent-bx">
                  <input type="text" />
                  <span>%</span>
                </div>
              </div>
              <p>On lose</p>
              <div className="dicegame-onwin">
                <div className="gamedice-reset_btn">
                  <span className="dicegame-reset-bx">Reset</span>
                  <span className="dicegame-increase">Increase by</span>
                </div>
                <div className="dicegame-pecent-bx">
                  <input type="text" />
                  <span>%</span>
                </div>
              </div>
              <p>Stop on win</p>
              <div className="mrg-b dicegame-placebet__amount">
                <span>
                  <img src="./twemoji_coin.svg" alt="coin" />
                  10
                </span>
              </div>
              <p>Stop on lose</p>
              <div className="dicegame-placebet__amount">
                <span>
                  <img src="./twemoji_coin.svg" alt="coin" />
                  10
                </span>
              </div>
              <button className="dicegame-rollnow">Start Auto Bet</button>
            </div>
          ) : (
            <>
              <div className="dicegame-placebet__bet">
                <p>Amount</p>
                <div className="dicegame-placebet__amount">
                  <div className="dicegame-placebet__amount-display">
                    <img src="./twemoji_coin.svg" alt="coin" />
                    <input type="text" value={betAmount} onChange={handleBetAmount} />
                  </div>
                  <div className="dicegame-placebet__amount-toggle">
                    <span style={{cursor: 'pointer'}} onClick={() => {setBetAmount(betAmount/2)}}>/2</span>
                    <span style={{cursor: 'pointer'}} onClick={() => {setBetAmount(betAmount*2)}}>2</span>
                    <div className="count-arrows">
                      <img style={{cursor: 'pointer'}} onClick={() => {setBetAmount(betAmount+1)}} src="./count_arrow-top.svg" alt="" />
                      <img style={{cursor: 'pointer'}} onClick={() => {setBetAmount(betAmount-1)}} src="./count_arrow-down.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="dicegame-placebet__select-amount">
                  <span onClick={() => {setBetAmount(10)}}>10</span>
                  <span onClick={() => {setBetAmount(100)}}>100</span>
                  <span onClick={() => {setBetAmount(1000)}}>1000</span>
                  <span onClick={() => {setBetAmount(10000)}}>10000</span>
                </div>
                <p>Win Amount</p>
                <div className="dicegame-placebet__amount">
                  <span>
                    <img src="./twemoji_coin.svg" alt="coin" />
                    {betAmount * (100 / diceRoll).toFixed(4)}
                  </span>
                </div>
                <button onClick={placeBet} className="dicegame-rollnow">Roll Now</button>
              </div>
            </>
          )}
        </div>
        <div className="dicegame-diceroll">
          <div className="dicegame-diceroll__odds">
            <span>88.59</span>
            <span>74.17</span>
            <span className="dicegame-diceroll__odds-active">37.56</span>
            <span className="dicegame-diceroll__odds-active">32.95</span>
            <span>55.34</span>
            <span>92.81</span>
            <span>67.89</span>
            <span>51.73</span>
          </div>
          <div className="dicegame-diceroll__die">
            <img src="./dice-cube.png" alt="die" />
            <span>{diceRoll}</span>
          </div>
          <div className="dicegame-diceroll__range">
            <input
              type="range"
              min="0"
              max="100"
              value={diceRoll}
              onChange={handleChange}
            />
          </div>
          <div className="dicegame-diceroll__range_values">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
          <div className="dicegame-diceroll__box">
            <div className="dicegame-diceroll__outer-box">
              <p>Payout</p>
              <div className="dicegame-diceroll__box-info">
                <span>{(100 / diceRoll).toFixed(4)}</span>
                <span>x</span>
              </div>
            </div>
            <div className="dicegame-diceroll__outer-box">
              <p>Roll Under</p>
              <div className="dicegame-diceroll__box-info dicegame-diceroll-rollover">
                <span>{diceRoll}</span>
                <img src="./rollover.svg" alt="rollover" />
              </div>
            </div>
            <div className="dicegame-diceroll__outer-box">
              <p>Win Chance</p>
              <div className="dicegame-diceroll__box-info">
                <span>{diceRoll - 1}</span>
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {fairness && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <p>Fairness</p>
              <span
                onClick={() => {
                  setFairness(!fairness);
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <div className="self-exclusion_container">
                <p style={{ textAlign: 'center' }}>
                  Eliteplay uses a provably fair cryptographic system. Each roll
                  is cryptographically fair and can be verified to be
                  manipulation free. A pair of server and client seeds calculate
                  roll numbers. Eliteplay players can make randomization of the
                  pair of seeds before one bet:
                </p>
                <p>User Seed</p>
                <div className="randomize-seed">
                  <div className="randomize-seedbox">
                    <p>QuVbgOAhQ9gAjG3hfEoGh7IhpHIjXjvJ</p>
                  </div>
                  <button>Randomize</button>
                </div>
                <p>Server Seed (Hashed)</p>
                <div className="randomize-seed">
                  <div className="randomize-seedbox">
                    <p>
                      9bb0f140e20e6809d1c54a2aa21efb324e0eaa959e2faf259e4a50662fa5e247
                    </p>
                  </div>
                  <button>Randomize</button>
                </div>

                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                  To learn more information about our provably fair system,
                  please check our 
                  <a
                    href="/helpcenter"
                    style={{ color: '#88DF95', textDecoration: 'none' }}
                  >
                    Help Center
                  </a>
                   Page.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {livebet && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <p>Live Bet</p>
              <span
                onClick={() => {
                  setLivebet(!livebet);
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <table className="dice--livebet-table">
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Roll</th>
                    <th>Amount</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src="./twemoji_coin.svg" alt="coin" /> Yuxeer
                    </td>
                    <td>&lt;52/13</td>
                    <td>100</td>
                    <td>Betting</td>
                  </tr>
                  <tr>
                    <td>
                      <img src="./twemoji_coin.svg" alt="coin" /> Yuxeer
                    </td>
                    <td>&lt;52/13</td>
                    <td>100</td>
                    <td>Betting</td>
                  </tr>
                  <tr>
                    <td>
                      <img src="./twemoji_coin.svg" alt="coin" /> Yuxeer
                    </td>
                    <td>
                      &lt;52<span className="red">/13</span>
                    </td>
                    <td>100</td>
                    <td className="red">-100</td>
                  </tr>
                  <tr>
                    <td>
                      <img src="./twemoji_coin.svg" alt="coin" /> Yuxeer
                    </td>
                    <td>
                      &lt;52<span className="green">/13</span>
                    </td>
                    <td>100</td>
                    <td className="green">+1000</td>
                  </tr>
                  <tr>
                    <td>
                      <img src="./twemoji_coin.svg" alt="coin" /> Yuxeer
                    </td>
                    <td>
                      &lt;52<span className="green">/13</span>
                    </td>
                    <td>100</td>
                    <td className="green">+1000</td>
                  </tr>
                  <tr>
                    <td>
                      <img src="./twemoji_coin.svg" alt="coin" /> Yuxeer
                    </td>
                    <td>
                      &lt;52<span className="red">/13</span>
                    </td>
                    <td>100</td>
                    <td className="red">-100</td>
                  </tr>
                  <tr>
                    <td>
                      <img src="./twemoji_coin.svg" alt="coin" /> Yuxeer
                    </td>
                    <td>
                      &lt;52<span className="red">/13</span>
                    </td>
                    <td>100</td>
                    <td className="red">-100</td>
                  </tr>
                  <tr>
                    <td>
                      <img src="./twemoji_coin.svg" alt="coin" /> Yuxeer
                    </td>
                    <td>
                      &lt;52<span className="red">/13</span>
                    </td>
                    <td>100</td>
                    <td className="red">-100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {tutorial && (
        <div
          className={`tutorial-dropdown ${
            isNavOpen ? 'tutorial-dropdown-open' : ''
          }`}
        >
          <div className="tutorial-dropdown-content">
            <a href="/dicebeginner">Beginners Guide</a>
            <p>
              Learn the basics here. <br /> How to play dice gambling, and how
              to roll dice?
            </p>
            <a href="/dicestrategy">Strategies</a>
            <p>
              Some popular winning strategies for bitcoin dice can be found
              here.
            </p>
            <a href="/diceautomation">Automation Scripts</a>
            <p>
              Running scripts is an advanced way to play bitcoin dice that
              presumably offers easier wins.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceGame;
