import { useState, useRef, useEffect, useCallback } from 'react';
import './DiceGame.css';
import instance from '../utils/api';
import { useAppContext } from '../hooks/useAppContext';
import { useDisclosure } from '../hooks/useDisclosure';
import { useNotifyAuth } from '../hooks/useNotifyAuthorized';
import { isElementClassOrChildOf } from '../utils/dom';
import { Link } from 'react-router-dom';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useToast } from '@chakra-ui/react';

const DiceGame = ({ userBets }) => {
  const [auto, setAuto] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const [diceRoll, setDiceRoll] = useState(50);
  const [betAmount, setBetAmount] = useState(10);
  const [autoBet, setAutoBet] = useState(false);
  const [numBets, setNumBets] = useState(0);
  const [stopOnWin, setStopOnWin] = useState(10);
  const [stopOnLoss, setStopOnLoss] = useState(10);
  const [winIncreaseBy, setWinIncreaseBy] = useState(0);
  const [lossIncreaseBy, setLossIncreaseBy] = useState(0);
  const [onWinOption, setOnWinOption] = useState(0);
  const [onLossOption, setOnLossOption] = useState(0);
  const [diceGameResponse, setDiceGameResponse] = useState()
  const [rollover, setRollover] = useState(false)
  const dropdownRef = useRef(null);
  const openTutorialRef = useRef(null);
  const [userSeed, setUserSeed] = useState('');
  const [serverSeed, setServerSeed] = useState('')
  const [winAmount, setWinAmount] = useState(0)
  const [lossAmount, setLossAmount] = useState(0)
  const [inProcess, setInProcess] = useState(false)

  const { isOpen: isOpenLiveGames, onOpen: onOpenLiveGames, onClose: onCloseLiveGames } = useDisclosure();
  const { isOpen: isOpenFair, onOpen: onOpenFair, onClose: onCloseFair } = useDisclosure();

  const { state } = useAppContext();

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
    const url = `/game/randomize-server-seed`;
    instance.post(url)
      .then((response) => {
        if (!(response.status === 200 || response.status === 201)) {
          throw new Error('Failed to randomize server seed');
        }
        return response.data;
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

  const handleNumBets = (event) => {
    if (event.target.value >= 1 && event.target.value <= 1000000000) {
      setNumBets(parseInt(event.target.value));
    }
  }

  const handleToggleInfinity = () => {
    setNumBets(Infinity);
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

  const updateUser = useUpdateUser();

  const toast = useToast();
  const notifyAuthorized = useNotifyAuth();

  const placeBet = useCallback(async () => {
    const token = generateRandomToken(36);
    const url = `/game/place-bet`;
    const pay = Number((100 / diceRoll).toFixed(4));

    if (!state.user | state.user?.balance < betAmount) {
      toast({
        position: 'bottom',
        status: 'error',
        title: 'Insufficient funds',
        description: "Balance low, Deposit Please",
      });
      throw new Error('Insufficient funds');
    }

    playSound();

    const data = {
      amount: betAmount,
      isRollOver: rollover,
      targetValue: Number(diceRoll),
      payout: pay,
      serverSeed: serverSeed,
      clientSeed: token,
    };

    return instance.post(url, data)
      .then((response) => {
        if (response.status === 201) {
          if (response.data?.betStatus === 'win') {
            toast({
              position: 'bottom',
              status: 'success',
              title: 'Auto Bet',
              description: `You won ${response.data.winAmount} coins by rolling ${response.data.roll}`,
              size: 'sm',
              duration: 2000
            });
          } else {
            toast({
              position: 'bottom',
              status: 'error',
              title: 'Auto Bet',
              description: `You lost ${betAmount} coins by rolling ${response.data.roll}`,
              size: 'sm',
              duration: 2000
            });
          }

          setDiceGameResponse(response.data)
          setWinAmount((prev) => prev + response.data.winAmount)
          setLossAmount((prev) => prev + betAmount)
          updateUser();
          return response.data;
        } else {
          toast({
            position: 'bottom',
            status: 'error',
            title: 'Failed to place bet',
            description: response.data.message || 'An error occurred',
          });
        }
      })
      .catch((error) => {
        toast({
          position: 'bottom',
          status: 'error',
          title: 'Failed to place bet',
          description: error.message || 'An error occurred',
        });
      });
  }, [betAmount, diceRoll, rollover, serverSeed, state.user, updateUser, toast]);

  const startAutoBet = () => {
    notifyAuthorized();
    setAutoBet(true);
  };

  const stopAutoBet = () => {
    setAutoBet(false);
    setWinAmount(0);
    setLossAmount(0);
    setInProcess(false);
  };

  useEffect(() => {
    function next() {
      // Place the next bet
      setTimeout(() => {
        setInProcess(false);
      }, 2000);
    }
    function end() {
      // End the auto bet
      setAutoBet(false);
      setWinAmount(0);
      setLossAmount(0);
      next();
    }
    if (autoBet && !inProcess) {
      console.log('Placing a new bet due to auto bet');
      setInProcess(true);
      placeBet().then((diceGameResponse) => {

        // Check if the number of bets is not infinite
        if (numBets !== Infinity) {
          setNumBets(numBets - 1);
          if ((numBets - 1) <= 0) {
            toast({
              position: 'bottom',
              status: 'success',
              title: 'Auto Bet Stopped',
              description: 'Number of bets reached',
            });
            end();
            return;
          }
        }

        // Handle reset
        if (diceGameResponse?.betStatus === 'win') {
          if (onWinOption === 0) {
            setDiceRoll(diceGameResponse.targetValue);
          } else {
            setDiceRoll(Math.ceil(diceGameResponse.targetValue + ((winIncreaseBy * diceGameResponse.targetValue) / 100)));
          }
        } else {
          if (onLossOption === 0) {
            setDiceRoll(diceGameResponse.targetValue);
          } else {
            setDiceRoll(Math.ceil(diceGameResponse.targetValue + ((lossIncreaseBy * diceGameResponse.targetValue) / 100)));
          }
        }

        // Handle stop on win
        if (diceGameResponse?.betStatus === 'win' && winAmount >= stopOnWin) {
          toast({
            position: 'bottom',
            status: 'success',
            title: 'Auto Bet Stopped',
            description: 'Stop on win reached',
          });
          end();
          return;
        }

        // Handle stop on loss
        if (diceGameResponse?.betStatus === 'loss' && lossAmount >= stopOnLoss) {
          toast({
            position: 'bottom',
            status: 'success',
            title: 'Auto Bet Stopped',
            description: 'Stop on loss reached',
          });
          end();
          return;
        }
        next();
      }).catch(() => {
        end();
      });
    }
  }, [autoBet, placeBet, numBets, onWinOption, toast, winAmount, stopOnWin, lossAmount, stopOnLoss, onLossOption, winIncreaseBy, lossIncreaseBy, inProcess]);

  return (
    <div className={`dicegame`}>
      <div className="dicegame-buttons">
        <button className="dicegame-dice-title">Dice</button>
        <button
          onClick={() => {
            onOpenLiveGames();
          }}
        >
          <img src="./Exclude.svg" alt="icon" /> Live Games
        </button>
        <button
          onClick={() => {
            onOpenFair();
          }}
        >
          <img
            className="dicegame-fairnesslogo"
            src="./fairness.svg"
            alt="fairness"
          />{' '}
          Fairness Checker
        </button>
        <div
          style={{
            position: 'relative',
          }}>
          <button
            id="tutorialButton"
            ref={openTutorialRef}
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

          {tutorial && (
            <div
              className={`tutorial-dropdown-crash`} ref={dropdownRef}
            >
              <div className="tutorial-dropdown-content">
                <Link to="/dicebeginner">Beginners Guide</Link>
                <p>
                  Learn the basics here. <br /> How to play dice gambling, and how
                  to roll dice?
                </p>
                <Link to="/dicestrategy">Strategies</Link>
                <p>
                  Some popular winning strategies for bitcoin dice can be found
                  here.
                </p>
                <Link to="/diceautomation">Automation Scripts</Link>
                <p>
                  Running scripts is an advanced way to play bitcoin dice that
                  presumably offers easier wins.
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
              <div>
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
                <p>Number of Bets</p>
                <div className="dicegame-placebet__amount">
                  <div className="dicegame-placebet__amount-display">
                    <input
                      type="text"
                      value={numBets === Infinity ? '∞' : numBets}
                      onChange={handleNumBets}
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
                <p>On win</p>
                <div className="dicegame-onwin">
                  <div className="gamedice-reset_btn">
                    <span className={`dicegame-reset-bx ${onWinOption == 0 && "active"}`} onClick={() => setOnWinOption(0)}>Reset</span>
                    <span className={`dicegame-increase ${onWinOption == 1 && "active"}`} onClick={() => setOnWinOption(1)}>Increase by</span>
                  </div>
                  <div className="dicegame-pecent-bx">
                    <input type="number"
                      value={winIncreaseBy}
                      onChange={(event) => {
                        const value = parseFloat(event.target.value);
                        setWinIncreaseBy(isNaN(value) ? 0 : value);
                      }}
                      disabled={!onWinOption}
                    />
                    <span>%</span>
                  </div>
                </div>
                <p>On lose</p>
                <div className="dicegame-onwin">
                  <div className="gamedice-reset_btn">
                    <span className={`dicegame-reset-bx ${onLossOption == 0 && "active"}`} onClick={() => setOnLossOption(0)}>Reset</span>
                    <span className={`dicegame-increase ${onLossOption == 1 && "active"}`} onClick={() => setOnLossOption(1)}>Increase by</span>
                  </div>
                  <div className="dicegame-pecent-bx">
                    <input type="number"
                      value={lossIncreaseBy}
                      onChange={(event) => {
                        const value = parseFloat(event.target.value);
                        setLossIncreaseBy(isNaN(value) ? 0 : value)
                      }}
                      disabled={!onLossOption}
                    />
                    <span>%</span>
                  </div>
                </div>
                <p>Stop on win</p>
                <div className="dicegame-placebet__amount">
                  <div className="dicegame-placebet__amount-display">
                    <img src="./twemoji_coin.svg" alt="coin" />
                    <input
                      type="number"
                      value={stopOnWin}
                      onChange={handleChangeStopOnWin}
                    />
                  </div>
                </div>
                <p>Stop on lose</p>
                <div className="dicegame-placebet__amount">
                  <div className="dicegame-placebet__amount-display">
                    <img src="./twemoji_coin.svg" alt="coin" />
                    <input
                      type="number"
                      value={stopOnLoss}
                      onChange={handleChangeStopOnLoss}
                    />
                  </div>
                </div>
              </div>
              {!autoBet && (
                <button
                  className={`dicegame-rollnow ${autoBet ? 'disabled' : ''}`}
                  onClick={startAutoBet}
                  disabled={autoBet}
                >
                  Start Auto Bet
                </button>
              )}
              {autoBet && (
                <button
                  className={`dicegame-rollnow ${autoBet ? '' : 'disabled'}`}
                  onClick={stopAutoBet}
                  disabled={!autoBet}
                >
                  Stop Auto Bet
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="dicegame-placebet__bet">
                <div>
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
                </div>
                <button onClick={() => {
                  notifyAuthorized();
                  placeBet();
                }} className="dicegame-rollnow">
                  Roll Now
                </button>
              </div>
            </>
          )}
        </div>
        <div className="dicegame-diceroll">
          <div className="dicegame-diceroll__odds">
            {userBets.map((bet, index) => {
              <span key={index} className={bet.betStatus === 'win' ? 'dicegame-diceroll__odds-active' : ''}>{bet.payout}</span>
            })}
          </div>
          {/* <div style={{ marginLeft: diceRoll - (width <= 568 ? 10 : 6) + '%' }} className="dicegame-diceroll__die"> */}
          <div className="dicegame-diceroll__die">
            <img src="./dice-cube.png" alt="die" />
            <span className={`${diceGameResponse?.betStatus === 'win' ? 'green' : ''} ${diceGameResponse?.betStatus === 'loss' ? 'red' : ''} ${state.chatOpen ? 'center-cube' : ''}`} >{diceRoll}</span>
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
                <span>{rollover ? (100 / (100 - diceRoll)).toFixed(4) : (100 / diceRoll).toFixed(4)}</span>
                <span>x</span>
              </div>
            </div>
            <div className="dicegame-diceroll__outer-box">
              <p>{rollover ? 'Roll Over' : 'Roll Under'}</p>
              <div className="dicegame-diceroll__box-info dicegame-diceroll-rollover">
                <span>{diceRoll}</span>
                <img onClick={() => setRollover(!rollover)} style={{ cursor: 'pointer' }} src="./rollover.svg" alt="rollover" />
              </div>
            </div>
            <div className="dicegame-diceroll__outer-box">
              <p>Win Chance</p>
              <div className="dicegame-diceroll__box-info">
                <span>{rollover ? 100 - (diceRoll - 1) : diceRoll - 1}</span>
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenFair && (
        <div className="editusername-popup">
          <div className="editusername-popup_container" style={{
            maxWidth: '560px'
          }}>
            <div className="editusername-popup_header">
              <p>Fairness</p>
              <span
                onClick={() => {
                  onCloseFair();
                }}
                className="close email-close"
              >
                X
              </span>
            </div>
            <div className="editusername-popup_main-content">
              <div className="self-exclusion_container">
                <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  Eliteplay uses a provably fair cryptographic system. Each roll
                  is cryptographically fair and can be verified to be
                  manipulation free. A pair of server and client seeds calculate
                  roll numbers. Eliteplay players can make randomization of the
                  pair of seeds before one bet:
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ marginBottom: '10px' }}>User Seed</p>
                  <div className="randomize-seed">
                    <div className="randomize-seedbox">
                      <p>{userSeed}</p>
                    </div>
                    <button style={{ cursor: 'pointer' }} onClick={() => { generateRandomToken(36) }}>Randomize</button>
                  </div>
                </div>
                <p style={{ marginBottom: '10px' }}>Server Seed (Hashed)</p>
                <div className="randomize-seed">
                  <div className="randomize-seedbox">
                    <p>
                      {serverSeed}
                    </p>
                  </div>
                  <button style={{ cursor: 'pointer' }} onClick={getserverToken}>Randomize</button>
                </div>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '16px' }}>
                  To learn more information about our provably fair system,
                  please check our
                  <Link
                    to="/helpcenter"
                    style={{ color: '#88DF95', textDecoration: 'underline' }}
                  >
                    {' '}Help Center
                  </Link>{' '}
                  Page.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpenLiveGames && (
        <div className="editusername-popup">
          <div className="editusername-popup_container">
            <div className="editusername-popup_header">
              <p>Live Bet</p>
              <span
                onClick={() => {
                  onCloseLiveGames();
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

export default DiceGame;
