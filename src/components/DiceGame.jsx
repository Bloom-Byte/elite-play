import React, { useState } from 'react';
import './DiceGame.css';

const DiceGame = ({ isNavOpen }) => {
  const [auto, setAuto] = useState(false);
  const [fairness, setFairness] = useState(false);
  const [livebet, setLivebet] = useState(false);

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
              <div className="mrg-b dicegame-placebet__amount">
                <span>
                  <img src="./twemoji_coin.svg" alt="coin" />
                  10
                </span>
                <div className="dicegame-placebet__amonut-toggle">
                  <span>/2</span>
                  <span>2</span>
                </div>
              </div>
              <p>Number of Bets</p>
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
                <button className="dicegame-rollnow">Roll Now</button>
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
            <img src="./die.svg" alt="die" />
          </div>
          <div className="dicegame-diceroll__range">
            <input type="range" min="0" max="100" value="50" />
          </div>
          <div className="dicegame-diceroll__range_values">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>100</span>
          </div>
          <div className="dicegame-diceroll__box">
            <div className="dicegame-diceroll__outer-box">
              <p>Payout</p>
              <div className="dicegame-diceroll__box-info">
                <span>1.98</span>
                <span>x</span>
              </div>
            </div>
            <div className="dicegame-diceroll__outer-box">
              <p>Roll Under</p>
              <div className="dicegame-diceroll__box-info dicegame-diceroll-rollover">
                <span>50</span>
                <img src="./rollover.svg" alt="rollover" />
              </div>
            </div>
            <div className="dicegame-diceroll__outer-box">
              <p>Win Chance</p>
              <div className="dicegame-diceroll__box-info">
                <span>50</span>
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
              <table className='dice--livebet-table'>
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
                    <td><img src="./twemoji_coin.svg" alt="coin" /> Yuxeer</td>
                    <td>&lt;52/13</td>
                    <td>100</td>
                    <td>Betting</td>
                  </tr>
                  <tr>
                    <td><img src="./twemoji_coin.svg" alt="coin" /> Yuxeer</td>
                    <td>&lt;52/13</td>
                    <td>100</td>
                    <td>Betting</td>
                  </tr>
                  <tr>
                    <td><img src="./twemoji_coin.svg" alt="coin" /> Yuxeer</td>
                    <td>&lt;52<span className='red'>/13</span></td>
                    <td>100</td>
                    <td className='red'>-100</td>
                  </tr>
                  <tr>
                    <td><img src="./twemoji_coin.svg" alt="coin" /> Yuxeer</td>
                    <td>&lt;52<span className='green'>/13</span></td>
                    <td>100</td>
                    <td className='green'>+1000</td>
                  </tr>
                  <tr>
                    <td><img src="./twemoji_coin.svg" alt="coin" /> Yuxeer</td>
                    <td>&lt;52<span className='green'>/13</span></td>
                    <td>100</td>
                    <td className='green'>+1000</td>
                  </tr>
                  <tr>
                    <td><img src="./twemoji_coin.svg" alt="coin" /> Yuxeer</td>
                    <td>&lt;52<span className='red'>/13</span></td>
                    <td>100</td>
                    <td className='red'>-100</td>
                  </tr>
                  <tr>
                    <td><img src="./twemoji_coin.svg" alt="coin" /> Yuxeer</td>
                    <td>&lt;52<span className='red'>/13</span></td>
                    <td>100</td>
                    <td className='red'>-100</td>
                  </tr>
                  <tr>
                    <td><img src="./twemoji_coin.svg" alt="coin" /> Yuxeer</td>
                    <td>&lt;52<span className='red'>/13</span></td>
                    <td>100</td>
                    <td className='red'>-100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceGame;
