import React, { useState, useRef, useEffect } from 'react';
import CrashGraph from './CrashGraph';
import './CrashGame.css';
import instance from '../utils/api';
import { ACCESS_TOKEN } from '../utils/constants';
import { useDisclosure } from '../hooks/useDisclosure';
import { isElementClassOrChildOf } from '../utils/dom';
import { Link } from 'react-router-dom';

const CrashGame = ({ isNavOpen, userBets, bets }) => {
  const [auto, setAuto] = useState(false);
  const [livebet, setLivebet] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [multiplier, setMultiplier] = useState(2.0);
  const [autoBet, setAutoBet] = useState(false);
  const [gameState, setGameState] = useState({
    isGameRunning: false,
    isGameCrashed: false,
    isBettingAllowed: false,
    currentMultiplier: 1,
    currentCrashPoint: 0,
  });

  const [isGameCrashed, setIsGameCrashed] = useState(false);
  const [recentMultipliers, setRecentMultipliers] = useState([]);
  const [currentCrashPoint, setCurrentCrashPoint] = useState(null);
  const dropdownRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.id !== 'tutorialButton' &&
        !isElementClassOrChildOf(event.target, 'tutorial-dropdown-crash')
      ) {
        setTutorial(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tutorial]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BASE_API_URL}/crash-game/game-state`,
      {}
    );

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setGameState(eventData);
      setIsGameCrashed(eventData.isGameCrashed);
      setCurrentCrashPoint(eventData.currentCrashPoint);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (currentCrashPoint !== null) {
      setRecentMultipliers((prevMultipliers) => [
        currentCrashPoint,
        ...prevMultipliers,
      ])
    }
  }, [currentCrashPoint])

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
      setMultiplier(cash);
    }
  };

  const handlePlaceBet = () => {
    instance.post('/crash-game/bet', {
      amount: betAmount,
      cashOutPoint: multiplier,
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return response.data;
        }
        throw new Error('Failed to place bet');
      })
      .then((data) => {
        // Handle successful bet placement
        console.log('Bet placed:', data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error placing bet:', error.message);
      });
  };

  return (
    <div className={`dicegame`}>
      <div className="dicegame-buttons">
        <button className="dicegame-dice-title">Crash</button>
        <button
          onClick={() => {
            onOpen();
          }}
        >
          {' '}
          <img src="./Exclude.svg" alt="" /> Live Games
        </button>
        <div
          style={{
            position: 'relative',
          }}>
          <button
            id="tutorialButton"
            onClick={() => {
              setTutorial(!tutorial);
            }}
          >
            <img
              className="dicegame-fairnesslogo"
              src="./book-open-01.svg"
              alt="fairness"
            />{' '}
            Tutorial
          </button>

          {tutorial && (
            <div
              className={`tutorial-dropdown-crash`}
              ref={dropdownRef}
            >
              <div className="tutorial-dropdown-crash-content">
                <Link to="/crashbeginner">Beginners Guide</Link>
                <p>
                  Learn the basics here. <br />
                  What is crash gambling, and how to play crash gambling games?
                </p>
                <Link to="/crashstrategy">Strategies</Link>
                <p>
                  Some popular winning strategies for crash gambling can be found
                  here.
                </p>
                <Link to="/crashautomation">Automation Scripts</Link>
                <p>
                  Running scripts is an advanced way to play crash that presumably
                  offers easier wins.
                </p>
              </div>
            </div>
          )}
        </div>
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
                <p>Auto Cash Out</p>
                <div className="dicegame-placebet__amount">
                  <div className="dicegame-placebet__amount-display">
                    <input
                      type="text"
                      value={multiplier}
                      onChange={handleCashAmount}
                      style={{
                        width: '40px',
                        outline: 'none',
                      }}
                      step={0.1}
                    />
                    <span style={{ marginLeft: '5px' }}>x</span>
                  </div>
                  <div className="dicegame-placebet__amount-toggle">
                    <div className="crash-arrows">
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleCashUpdate(multiplier + 0.1);
                        }}
                        src="./crash-l.svg"
                        alt="arrow"
                      />
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleCashUpdate(multiplier - 0.1);
                        }}
                        src="./crash-r.svg"
                        alt="arrow"
                      />
                    </div>
                  </div>
                </div>
                <button onClick={handlePlaceBet} disabled={!isGameCrashed} className={`dicegame-rollnow ${isGameCrashed ? '' : 'disabled'}`}>Bet</button>
              </div>
            </>
          )}
        </div>
        <div className="dicegame-diceroll">
          <div className="dicegame-diceroll__odds">
            {recentMultipliers.length > 0 &&
              recentMultipliers.slice(0, 8).map((multiplier, index) => (
                <span key={index}>{multiplier}</span>
              ))}
            {/* <span className="dicegame-diceroll__odds-active">37.56</span>
            <span className="dicegame-diceroll__odds-active">32.95</span> */}
          </div>
          <CrashGraph gameState={gameState} />
        </div>
      </div>
      {isOpen && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <p>Live Bet</p>
              <span
                onClick={() => {
                  onClose();
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
    </div>
  );
};

export default CrashGame;
