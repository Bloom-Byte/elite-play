import { useState, useRef, useEffect, useCallback } from 'react';
import CrashGraph from './CrashGraph';
import './CrashGame.css';
import instance from '../utils/api';
import { useDisclosure } from '../hooks/useDisclosure';
import { isElementClassOrChildOf } from '../utils/dom';
import { Link } from 'react-router-dom';
import { useNotifyAuth } from '../hooks/useNotifyAuthorized';
import { useToast } from '@chakra-ui/react';
import { useAppContext } from '../hooks/useAppContext';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { toFixed } from '../utils/helpers';

const CrashGame = ({ bets }) => {
  const [auto, setAuto] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [multiplier, setMultiplier] = useState(1.0);
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

  const [baseBet, setBaseBet] = useState(10);
  const [betCount, setBetCount] = useState(10);
  const [cumulativeBetAmount, setCumulativeBetAmount] = useState(10);

  const [onWinOption, setOnWinOption] = useState(0);
  const [winIncreaseBy, setWinIncreaseBy] = useState(0);
  const [onLossOption, setOnLossOption] = useState(0);
  const [lossIncreaseBy, setLossIncreaseBy] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const notifyAuthorized = useNotifyAuth();
  const updateUser = useUpdateUser();

  const [winAmount, setWinAmount] = useState(0)
  const [lossAmount, setLossAmount] = useState(0)
  const [inProcess, setInProcess] = useState(false)
  const [autoBet, setAutoBet] = useState(false);

  const [currentBetId, setCurrentBetId] = useState(null);
  const [betResult, setBetResult] = useState(null);

  const [currentGameBets, setCurrentGameBets] = useState([]);

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
    // Clear the current bets if the game is crashed
    if (isGameCrashed) {
      setCurrentGameBets([]);
    }
  }, [isGameCrashed]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BASE_API_URL}/crash-game/live-bets`,
      {}
    );

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log('Live bet data', eventData);
      if (!eventData.isResolved) {
        setCurrentGameBets((prevBets) => [eventData, ...prevBets]);
      } else {
        // Update the specific bet if it's already in the list
        // setCurrentGameBets((prevBets) => {
        //   const newBets = prevBets.map((bet) => {
        //     if (bet._id === eventData._id) {
        //       return eventData;
        //     }
        //     return bet;
        //   });
        //   return newBets;
        // });
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BASE_API_URL}/crash-game/game-state`,
      {}
    );

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setGameState(eventData);
      setIsGameCrashed(eventData.isGameCrashed);

      if (eventData.isGameCrashed) {
        updateUser();
      }

      setCurrentCrashPoint(eventData.currentCrashPoint);

      // Loop through the current bets and check if any of them is resolved
      setCurrentGameBets((prevBets) => {
        const newBets = prevBets.map((bet) => {
          const resolved = eventData.currentMultiplier >= bet.cashOutPoint;
          if (resolved) {
            return {
              ...bet,
              isResolved: true,
              status: 'win',
              payout: bet.amount * bet.cashOutPoint,
            };
          }
          return bet;
        });
        return newBets;
      });
    };

    return () => {
      eventSource.close();
    };
  }, [updateUser]);

  useEffect(() => {
    if (currentCrashPoint !== null) {
      setRecentMultipliers((prevMultipliers) => [
        currentCrashPoint,
        ...prevMultipliers,
      ])
    }
  }, [currentCrashPoint])

  const handleBetAmount = (event) => {
    const value = parseFloat(event.target.value);
    setBetAmount(isNaN(value) ? 0 : value);
  };

  const handleBetAmountCount = (count) => {
    if (count >= 1) {
      setBetCount(count);
    }
  };

  const handleCashAmount = (event) => {
    const value = parseFloat(event.target.value);
    if (isNaN(value)) {
      setMultiplier(1);
      return;
    }
    if (value >= 1) {
      setMultiplier(parseFloat(value));
    }
  };

  const handleCashUpdate = (cash) => {
    if (cash < 1) {
      setMultiplier(1);
      return
    }
    setMultiplier(parseFloat(cash.toFixed(2)));
  };

  const toast = useToast();
  const { state } = useAppContext();

  const handlePlaceBet = useCallback(async () => {
    notifyAuthorized();

    if (!state.user || state.user?.balance < betAmount) {
      toast({
        position: 'bottom',
        status: 'error',
        title: 'Insufficient funds',
        description: "Balance low, Deposit Please",
      });
      throw new Error('Insufficient funds');
    }

    console.log('Calling bet endpoint');
    console.log(`Bet amount: ${betAmount}`)
    console.log(`Cash out: ${multiplier}`)

    return instance.post('/crash-game/bet', {
      amount: betAmount,
      cashOutPoint: multiplier,
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return response.data;
        }
        toast({
          position: 'bottom',
          status: 'error',
          title: 'Failed',
          description: response?.data?.error || 'Failed to place bet',
          size: 'sm',
          duration: 2000
        });
      })
      .then((data) => {
        setCurrentBetId(data.betId);
        // Handle successful bet placement
        toast({
          position: 'bottom',
          status: 'info',
          title: 'Success',
          description: data.message,
          size: 'sm',
          duration: 4000
        });
        updateUser();
        return data;
      })
      .catch(() => {
        toast({
          position: 'bottom',
          status: 'error',
          title: 'Error',
          description: "Can't place bet try again later",
          size: 'sm',
          duration: 4000
        });
      });
  }, [betAmount, multiplier, notifyAuthorized, state.user, toast, updateUser]);

  useEffect(() => {
    if (currentBetId) {
      const latestBet = bets[0];
      if (latestBet && latestBet._id === currentBetId && latestBet.isResolved) {
        setBetResult(latestBet);
        setInProcess(false);
      }
    }
  }, [currentBetId, bets]);

  useEffect(() => {
    function next() {
      setInProcess(false);
    }
    function end() {
      // End the auto bet
      setAutoBet(false);
      setWinAmount(0);
      setLossAmount(0);
      setBetResult(null);
      setCurrentBetId(null);
      next();
    }
    if (autoBet && !inProcess) {
      console.log('Auto bet processing');
      setInProcess(true);

      if (betResult) {
        toast({
          position: 'bottom',
          status: betResult?.status === 'win' ? 'success' : 'error',
          title: betResult?.status === 'win' ? 'Win' : 'Loss',
          description: `You ${betResult?.status === 'win' ? 'won' : 'lost'} ${betResult?.status === 'win' ? betResult?.payout : betResult?.amount}`,
          size: 'sm',
          duration: 2000
        });
      }

      // Check number of bets
      if ((betCount) <= 0) {
        toast({
          position: 'bottom',
          status: (winAmount + betResult.payout) > (lossAmount + betResult.amount) ? 'success' : 'error',
          title: 'Auto Bet Stopped',
          description: `Number of bets reached, you won ${winAmount + betResult.payout} and lost ${(lossAmount + betResult.amount)}`,
        });
        end();
        return;
      }

      console.log(`Bet count: ${betCount}`)

      // Check loss amount
      if (betResult) {
        console.log("Got new result for bet", betResult);
        if ((lossAmount + betResult.amount) >= cumulativeBetAmount) {
          toast({
            position: 'bottom',
            status: 'success',
            title: 'Auto Bet Stopped',
            description: 'Loss amount reached',
          });
          end();
          return;
        }

        setLossAmount((prev) => prev + betResult.amount);
        setWinAmount((prev) => prev + betResult.payout);
        console.log("Updated win and loss amount")

        // Handle reset
        if (betResult?.status === 'win') {
          if (onWinOption === 0) {
            setBetAmount(baseBet);
          } else {
            setBetAmount(Math.ceil(betResult.amount + ((winIncreaseBy * betResult.amount) / 100)));
          }
        } else {
          if (onLossOption === 0) {
            setBetAmount(baseBet);
          } else {
            setBetAmount(Math.ceil(betResult.amount + ((lossIncreaseBy * betResult.amount) / 100)));
          }
        }
        console.log('Handled bet reset')
        setBetResult(null);
        console.log("Unset bet result")
        setInProcess(false);
      } else {
        console.log('Placing a new bet due to auto bet');
        handlePlaceBet().then(() => {
          setBetCount((prev) => prev - 1);
          console.log(`Bet count reduced`)
        }).catch(() => {
          end();
        });
      }
    }
  }, [autoBet, betResult, betCount, cumulativeBetAmount, baseBet, inProcess, lossAmount, lossIncreaseBy, onLossOption, onWinOption, winAmount, winIncreaseBy, handlePlaceBet, toast]);


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
                if (autoBet) {
                  toast({
                    position: 'bottom',
                    status: 'error',
                    title: 'Auto Bet is running',
                    description: 'Wait for the current auto bet to finish',
                    size: 'sm',
                    duration: 2000
                  });
                  return;
                }
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
                <p>Bet Amount</p>
                <div className="dicegame-placebet__amount">
                  <div className="dicegame-placebet__amount-display">
                    <img src="./twemoji_coin.svg" alt="coin" />
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(event) => {
                        const value = parseFloat(event.target.value);
                        setBetAmount(isNaN(value) ? 0 : value);
                        setBaseBet(isNaN(value) ? 0 : value);
                      }}
                    />
                  </div>
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
                    />
                    <span style={{ marginLeft: '5px' }}>x</span>
                  </div>
                  <div className="dicegame-placebet__amount-toggle prevent-select">
                    <div className="crash-arrows">
                      <span
                        onClick={() => {
                          handleCashUpdate(multiplier - 0.01);
                        }}>
                        <img
                          src="./crash-l.svg"
                          alt="arrow"
                        />
                      </span>
                      <span
                        onClick={() => {
                          handleCashUpdate(multiplier + 0.01);
                        }}>
                        <img
                          src="./crash-r.svg"
                          alt="arrow"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <p>Stop if bet amount over</p>
                <div className="dicegame-placebet__amount">
                  <div className="dicegame-placebet__amount-display">
                    <img src="./twemoji_coin.svg" alt="coin" />
                    <input
                      type="number"
                      value={cumulativeBetAmount}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setCumulativeBetAmount(isNaN(value) ? 0 : value);
                      }}
                    />
                  </div>
                </div>
                <p>Stop if number of bets over</p>
                <div className="dicegame-placebet__amount">
                  <div className="dicegame-placebet__amount-display">
                    <input
                      type="number"
                      value={betCount}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setBetCount(isNaN(value) ? 0 : value);
                      }}
                    />
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
              </div>
              <button onClick={() => {
                notifyAuthorized();
                setAutoBet(true);
              }}
                disabled={autoBet || !isGameCrashed} className={`dicegame-rollnow ${isGameCrashed ? '' : 'disabled'}`}>Start Auto Bet</button>
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
                      />
                      <span style={{ marginLeft: '5px' }}>x</span>
                    </div>
                    <div className="dicegame-placebet__amount-toggle">
                      <div className="crash-arrows">
                        <span
                          onClick={() => {
                            handleCashUpdate(multiplier - 0.01);
                          }}>
                          <img
                            src="./crash-l.svg"
                            alt="arrow"
                          />
                        </span>
                        <span
                          onClick={() => {
                            handleCashUpdate(multiplier + 0.01);
                          }}>
                          <img
                            src="./crash-r.svg"
                            alt="arrow"
                          />
                        </span>
                      </div>
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
              {
                currentGameBets.length === 0 ? (
                  <div className="dice--livebet-empty">
                    <p>No live bets</p>
                  </div>
                ) : (
                  <table className="dice--livebet-table">
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Cash Out</th>
                        <th>Amount</th>
                        <th>Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentGameBets.map((bet) => {
                          const profit = bet.isResolved ? Math.max(bet.payout - bet.amount, 0) : '-';
                          return (
                            <tr key={bet._id} className={`${bet.isResolved ? 'resolved' : ''} ${profit > 0 && 'win'}`}>
                              <td>{bet.username}</td>
                              <td>{bet.cashOutPoint}x</td>
                              <td>
                                <div className="flexed">
                                  <img src="./twemoji_coin.svg" alt="coin" />{' '}
                                  {bet.amount}
                                </div></td>
                              <td>{toFixed(profit, 4)}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrashGame;
