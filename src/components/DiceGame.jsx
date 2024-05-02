import React, { useState, useRef, useEffect  } from 'react';
import axios from 'axios';
import './DiceGame.css';

const DiceGame = ({ isNavOpen, user, userBets, chatOpen, bets }) => {
  const [auto, setAuto] = useState(false);
  const [fairness, setFairness] = useState(false);
  const [livebet, setLivebet] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const [diceRoll, setDiceRoll] = useState(50);
  const [betAmount, setBetAmount] = useState(10);
  const [autoBet, setAutoBet] = useState(false);
  const [numBets, setNumBets] = useState(0);
  const [stopOnWin, setStopOnWin] = useState('');
  const [isInfinity, setIsInfinity] = useState(true);
  const [stopOnLoss, setStopOnLoss] = useState('');
  const [diceGameResponse, setDiceGameResponse] = useState()
  const [rollover, setRollover] = useState(false)
  const [stopConditions, setStopConditions] = useState({
    resetWin: 100,
    resetLose: 50,
  });
  const dropdownRef = useRef(null);
  const [userSeed, setUserSeed] = useState('');
  const [serverSeed, setServerSeed] = useState('')
  const accessToken = localStorage.getItem('accessToken');

  function generateRandomToken(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      token += charset[randomIndex];
    }
    setUserSeed(token)
    return token;
  }

  function getserverToken() {
    const url = `https://be.eliteplay.bloombyte.dev/game/randomize-server-seed`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', // Make sure to set the Content-Type header
    };
  
    fetch(url, {
      method: 'POST',
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to randomize server seed');
        }
        return response.json();
      })
      .then((data) => {
        setServerSeed(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    generateRandomToken(36);
    getserverToken();
  }, [])


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

  const handleChange = (event) => {
    if (event.target.value >= 5 && event.target.value <= 96) {
      setDiceRoll(event.target.value);
    }
  };

  const updateBetAmount = (amount) => {
    if (amount >= 1 && amount <= 1000000000) {
        setBetAmount(amount)
    }
  }

  const handleBetAmount = (event) => {
    if (event.target.value >= 1 && event.target.value <= 1000000000) {
      setBetAmount(event.target.value);
    }
  };

  const handleToggleInfinity = () => {
    setIsInfinity(!isInfinity);
    setNumBets(isInfinity ? 0 : Infinity);
  };

  const handleChangeStopOnWin = (event) => {
    const input = event.target.value;
    // Check if input is a valid number
    if (/^\d*\.?\d*$/.test(input)) {
      setStopOnWin(input);
    }
  };

  const handleChangeStopOnLoss = (event) => {
    const input = event.target.value;
    // Check if input is a valid number
    if (/^\d*\.?\d*$/.test(input)) {
      setStopOnLoss(input);
    }
  };

  function playSound() {
    const sound = new Audio('/dice_roll.mp3');
    sound.play();
  }

  function placeBet(isAutoBet) {
    const url = `https://be.eliteplay.bloombyte.dev/game/place-bet`;
    const pay = Number((100 / diceRoll).toFixed(4));

    if (!user | user?.balance < betAmount) {
      alert("Balance low, Deposit Please")
      return
    }

    playSound();

    const data = {
      amount: betAmount,
      isRollOver: rollover,
      targetValue: Number(diceRoll),
      payout: pay,
      serverSeed: serverSeed,
      clientSeed: userSeed
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .post(url, data, { headers })
      .then((response) => {
        if (response.status === 201) {
          setDiceGameResponse(response.data)
          setDiceRoll(response.data.roll)
        } else {
          throw new Error('Failed to place bet');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const startAutoBet = () => {
    setAutoBet(true);
  };

  const stopAutoBet = () => {
    setAutoBet(false);
  };

  useEffect(() => {
    let interval;
    if (autoBet) {
      interval = setInterval(() => {
        placeBet(true);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [autoBet]);

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
          <img src="./Exclude.svg" alt="icon" /> Live Games
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
                      updateBetAmount(betAmount / 2);
                    }}
                  >
                    /2
                  </span>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      updateBetAmount(betAmount * 2);
                    }}
                  >
                    2
                  </span>
                  <div className="count-arrows">
                    <img
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        updateBetAmount(betAmount + 1);
                      }}
                      src="./count_arrow-top.svg"
                      alt="arrow"
                    />
                    <img
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        updateBetAmount(betAmount - 1);
                      }}
                      src="./count_arrow-down.svg"
                      alt="arrow"
                    />
                  </div>
                </div>
              </div>
              <p style={{ marginTop: '1rem' }}>Number of Bets</p>
              <div className="dicegame-placebet__amount">
                <div className="dicegame-placebet__amount-display">
                  <input
                    type="text"
                    value={isInfinity ? '∞' : numBets}
                    // onChange={handleBetAmount}
                  />
                </div>
                <div className="dicegame-placebet__amount-toggle">
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setNumBets(10);
                    }}
                  >
                    10
                  </span>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setNumBets(100);
                    }}
                  >
                    100
                  </span>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={handleToggleInfinity}
                  >
                    &infin;
                  </span>
                </div>
              </div>
              <p style={{ marginTop: '1rem' }}>On win</p>
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
              <div className="dicegame-placebet__amount">
                <div className="dicegame-placebet__amount-display">
                  <img src="./twemoji_coin.svg" alt="coin" />
                  <input
                    type="text"
                    value={stopOnWin}
                    onChange={handleChangeStopOnWin}
                  />
                </div>
              </div>
              <p style={{ marginTop: '1rem' }}>Stop on lose</p>
              <div className="dicegame-placebet__amount">
                <div className="dicegame-placebet__amount-display">
                  <img src="./twemoji_coin.svg" alt="coin" />
                  <input
                    type="text"
                    value={stopOnLoss}
                    onChange={handleChangeStopOnLoss}
                  />
                </div>
              </div>
              <button
                className={`dicegame-rollnow ${autoBet ? 'disabled' : ''}`}
                onClick={startAutoBet}
                disabled={autoBet}
              >
                Start Auto Bet
              </button>
              <button
                className={`dicegame-rollnow ${autoBet ? '' : 'disabled'}`}
                onClick={stopAutoBet}
                disabled={!autoBet}
              >
                Stop Auto Bet
              </button>
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
                        updateBetAmount(betAmount / 2);
                      }}
                    >
                      /2
                    </span>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        updateBetAmount(betAmount * 2);
                      }}
                    >
                      2
                    </span>
                    <div className="count-arrows">
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          updateBetAmount(betAmount + 1);
                        }}
                        src="./count_arrow-top.svg"
                        alt="arrow"
                      />
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          updateBetAmount(betAmount - 1);
                        }}
                        src="./count_arrow-down.svg"
                        alt="arrow"
                      />
                    </div>
                  </div>
                </div>
                <div className="dicegame-placebet__select-amount">
                  <span
                    onClick={() => {
                      setBetAmount(10);
                    }}
                  >
                    10
                  </span>
                  <span
                    onClick={() => {
                      setBetAmount(100);
                    }}
                  >
                    100
                  </span>
                  <span
                    onClick={() => {
                      setBetAmount(1000);
                    }}
                  >
                    1000
                  </span>
                  <span
                    onClick={() => {
                      setBetAmount(10000);
                    }}
                  >
                    10000
                  </span>
                </div>
                <p>Win Amount</p>
                <div className="dicegame-placebet__amount">
                  <span>
                    <img src="./twemoji_coin.svg" alt="coin" />
                    {(betAmount * (100 / diceRoll)).toFixed(2)}
                  </span>
                </div>
                <button onClick={() => placeBet(false)} className="dicegame-rollnow">
                  Roll Now
                </button>
              </div>
            </>
          )}
        </div>
        <div className="dicegame-diceroll">
          <div className="dicegame-diceroll__odds">
            {userBets.map((bet, index) => {
              <span className={bet.betStatus === 'win' ? 'dicegame-diceroll__odds-active' : ''}>{bet.payout}</span>
            })}
          </div>
          <div style={{marginLeft: diceRoll-5+'%'}} className="dicegame-diceroll__die">
            <img src="./dice-cube.png" alt="die" />
            <span className={`${diceGameResponse?.betStatus === 'win' ? 'green' : ''} ${diceGameResponse?.betStatus === 'loss' ? 'red' : ''} ${chatOpen ? 'center-cube' : ''}`} >{diceRoll}</span>
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
              <p>{rollover? 'Roll Over' : 'Roll Under'}</p>
              <div className="dicegame-diceroll__box-info dicegame-diceroll-rollover">
                <span>{diceRoll}</span>
                <img onClick={() => setRollover(!rollover)} style={{cursor: 'pointer'}} src="./rollover.svg" alt="rollover" />
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
                    <p>{userSeed}</p>
                  </div>
                  <button style={{cursor: 'pointer'}} onClick={() => {generateRandomToken(36)}}>Randomize</button>
                </div>
                <p>Server Seed (Hashed)</p>
                <div className="randomize-seed">
                  <div className="randomize-seedbox">
                    <p>
                     {serverSeed}
                    </p>
                  </div>
                  <button style={{cursor: 'pointer'}} onClick={getserverToken}>Randomize</button>
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
          }`} ref={dropdownRef}
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
