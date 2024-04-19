import React, { useState } from 'react';
import CrashGraph from './CrashGraph';
import './CrashGame.css';

const CrashGame = ({ isNavOpen }) => {
  const [auto, setAuto] = useState(false);
  const [livebet, setLivebet] = useState(false);
  const [tutorial, setTutorial] = useState(false);

  const state = {
    crashData: [
      { value: 1 },
      { value: 1.5 },
      { value: 2 },
      // Add more data points as needed
    ]
  };

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
          <CrashGraph data={state.crashData} />
        </div>
      </div>
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
          className={`tutorial-dropdown-crash ${
            isNavOpen ? 'tutorial-dropdown-crash-open' : ''
          }`}
        >
          <div className="tutorial-dropdown-crash-content">
            <a href="/crashbeginner">Beginners Guide</a>
            <p>
              Learn the basics here. <br />What is crash gambling, and how to play crash gambling games?
            </p>
            <a href="/crashstrategy">Strategies</a>
            <p>
              Some popular winning strategies for crash gambling can be found
              here.
            </p>
            <a href="/crashautomation">Automation Scripts</a>
            <p>
              Running scripts is an advanced way to play crash that
              presumably offers easier wins.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrashGame;
