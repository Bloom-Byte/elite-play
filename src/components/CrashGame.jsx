import React, { useState, useRef, useEffect  } from 'react';
import CrashGraph from './CrashGraph';
import './CrashGame.css';

const CrashGame = ({ isNavOpen, userBets, bets }) => {
  const [auto, setAuto] = useState(false);
  const [livebet, setLivebet] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [multiplier, setMultiplier] = useState(2.00)
  const [autoBet, setAutoBet] = useState(false);
  const [gameState, setGameState] = useState({
    isGameRunning: false,
    isGameCrashed: false,
    isBettingAllowed: false,
    currentMultiplier: 1,
    currentCrashPoint: 0,
  });

  const [isGameStarting, setIsGameStarting] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tutorial &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setTutorial(false);
      }
    };

    if (tutorial) {
      // Only attach the listener if the dropdown is open
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (tutorial) {
        // Only remove the listener if it was previously added
        window.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [tutorial]);
  
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    const eventSource = new EventSource('https://be.eliteplay.bloombyte.dev/crash-game/game-state', {
    });

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setGameState(eventData);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleBetAmount = (event) => {
    if (event.target.value >= 1) {
      setBetAmount(event.target.value);
    }
  };

  const handleBetAmountCount = (count) => {
    if (count >= 1) {
      setBetAmount(count);
    }
  };

  const handleCashAmount = (event) => {
    if (event.target.value >= 2) {
      setMultiplier(event.target.value);
    }
  };

  const handleCashUpdate = (cash) => {
    if (cash >= 2) {
      setMultiplier(cash)
    }
  }

  return (
    <div className={`dicegame ${isNavOpen ? 'dicegame-extended' : ''}`}>
      <div className="dicegame-buttons">
        <button className="dicegame-dice-title">Crash</button>
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
              <div className="dicegame-placebet__amount">
                <div className="dicegame-placebet__amount-display">
                  <img src="./twemoji_coin.svg" alt="coin" />
                  <input
                    type="text"
                    value={betAmount}
                    onChange={handleBetAmount}
                  />
                </div>
                <div className="dicegame-placebet__amount-toggle">
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      handleBetAmountCount(betAmount / 2);
                    }}
                  >
                    /2
                  </span>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      handleBetAmountCount(betAmount * 2);
                    }}
                  >
                    2
                  </span>
                  <div className="count-arrows">
                    <img
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleBetAmountCount(betAmount + 1);
                      }}
                      src="./count_arrow-top.svg"
                      alt="arrow"
                    />
                    <img
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleBetAmountCount(betAmount - 1);
                      }}
                      src="./count_arrow-down.svg"
                      alt="arrow"
                    />
                  </div>
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
                  <div className="dicegame-placebet__amount-display">
                    <img src="./twemoji_coin.svg" alt="coin" />
                    <input
                      type="text"
                      value={betAmount}
                      onChange={handleBetAmount}
                    />
                  </div>
                  <div className="dicegame-placebet__amount-toggle">
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleBetAmountCount(betAmount / 2)
                      }}
                    >
                      /2
                    </span>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleBetAmountCount(betAmount * 2)
                      }}
                    >
                      2
                    </span>
                    <div className="count-arrows">
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleBetAmountCount(betAmount + 1)
                        }}
                        src="./count_arrow-top.svg"
                        alt="arrow"
                      />
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleBetAmountCount(betAmount - 1)
                        }}
                        src="./count_arrow-down.svg"
                        alt="arrow"
                      />
                    </div>
                  </div>
                </div>
                <div className="dicegame-placebet__select-amount">
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setBetAmount(10);
                    }}
                  >
                    10
                  </span>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setBetAmount(100);
                    }}
                  >
                    100
                  </span>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setBetAmount(1000);
                    }}
                  >
                    1000
                  </span>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setBetAmount(10000);
                    }}
                  >
                    10000
                  </span>
                </div>
                <p>Win Amount</p>
                <div className="dicegame-placebet__amount">
                  <div className="dicegame-placebet__amount-display">
                    
                    <input
                      type="text"
                      value={multiplier}
                      onChange={handleCashAmount}
                    />
                    <span style={{marginLeft:'5px'}}>x</span>
                  </div>
                  <div className="dicegame-placebet__amount-toggle">
                   
                    <div className="crash-arrows">
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleCashUpdate(multiplier + 1)
                        }}
                        src="./crash-l.svg"
                        alt="arrow"
                      />
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleCashUpdate(multiplier - 1)
                        }}
                        src="./crash-r.svg"
                        alt="arrow"
                      />
                    </div>
                  </div>
                </div>
                <button className="dicegame-rollnow">Bet</button>
              </div>
            </>
          )}
        </div>
        <div className="dicegame-diceroll">
          {/* <div className="dicegame-diceroll__odds">
            <span>88.59</span>
            <span>74.17</span>
            <span className="dicegame-diceroll__odds-active">37.56</span>
            <span className="dicegame-diceroll__odds-active">32.95</span>
            <span>55.34</span>
            <span>92.81</span>
            <span>67.89</span>
            <span>51.73</span>
          </div> */}
          <CrashGraph gameState={gameState} />
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
          }`}  ref={dropdownRef}
        >
          <div className="tutorial-dropdown-crash-content">
            <a href="/crashbeginner">Beginners Guide</a>
            <p>
              Learn the basics here. <br />
              What is crash gambling, and how to play crash gambling games?
            </p>
            <a href="/crashstrategy">Strategies</a>
            <p>
              Some popular winning strategies for crash gambling can be found
              here.
            </p>
            <a href="/crashautomation">Automation Scripts</a>
            <p>
              Running scripts is an advanced way to play crash that presumably
              offers easier wins.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrashGame;
