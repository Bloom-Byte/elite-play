import React, { useState } from 'react';
import './Livebets.css';

const Livebets = ({
  isNavOpen,
  diceAllBets,
  diceUserBets,
  crashAllBets,
  crashUserBets,
}) => {
  const [liveBets, setLiveBets] = useState([]);
  const [bigBets, setBigBets] = useState(false);
  return (
    <div className={`livebets ${isNavOpen ? 'livebets-extended' : ''}`}>
      <h5>Live Bets</h5>
      <div className="livebets-toggle">
        <button onClick={() => setBigBets(!bigBets)} className={`${bigBets ? 'big-bets' : 'all-bets'}`} >All Bets</button>
        <button onClick={() => setBigBets(!bigBets)} className={`${bigBets ? 'all-bets' : 'big-bets'}`} >Big Bets</button>
      </div>
      <div className="livebets-table">
        <table className="livebets-table_table">
          <thead>
            <tr>
              <th>Game</th>
              <th>Player</th>
              <th>Wager</th>
              <th>Multiplier</th>
              <th>Payout</th>
            </tr>
          </thead>
          <tbody>
            {bigBets ? (
              <>
                {Array.isArray(diceAllBets) && diceAllBets.slice(0, 5).map((dice, index) => (
                  <tr id={index}>
                    <td className="game-icon">
                      <img src="./dice-color.svg" />{' '}
                      <span className="dice">Dice</span>
                    </td>
                    <td>
                      <span className="name">{dice.username}</span>
                    </td>
                    <td>
                      <img src="./twemoji_coin.svg" />{' '}
                      <span>{dice.amount}</span>
                    </td>
                    <td>{dice.payout}x</td>
                    <td>
                      <img src="./twemoji_coin.svg" />{' '}
                      <span
                        className={dice.betStatus === 'loss' ? 'red' : 'green'}
                      >
                        {dice.betStatus === 'loss'
                          ? '-' + dice.amount
                          : '+' + dice.winAmount}
                      </span>
                    </td>
                  </tr>
                ))}
                {Array.isArray(crashAllBets) && crashAllBets.slice(0, 5).map((dice, index) => (
                  <tr id={index}>
                    <td className="game-icon">
                      <img src="./chart-increase-color.svg" />{' '}
                      <span className="crash">Crash</span>
                    </td>
                    <td>
                      <span className="name">{dice.username}</span>
                    </td>
                    <td>
                      <img src="./twemoji_coin.svg" />{' '}
                      <span>{dice.amount}</span>
                    </td>
                    <td>{dice.payout}x</td>
                    <td>
                      <img src="./twemoji_coin.svg" />{' '}
                      <span
                        className={dice.betStatus === 'loss' ? 'red' : 'green'}
                      >
                        {dice.betStatus === 'loss'
                          ? '-' + dice.amount
                          : '+' + dice.winAmount}
                      </span>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {Array.isArray(diceAllBets) && diceAllBets.slice(0, 5).map((dice, index) => (
                  <tr id={index}>
                    <td className="game-icon">
                      <img src="./dice-color.svg" />{' '}
                      <span className="dice">Dice</span>
                    </td>
                    <td>
                      <span className="name">{dice.username}</span>
                    </td>
                    <td>
                      <img src="./twemoji_coin.svg" />{' '}
                      <span>{dice.amount}</span>
                    </td>
                    <td>{dice.payout}x</td>
                    <td>
                      <img src="./twemoji_coin.svg" />{' '}
                      <span
                        className={dice.betStatus === 'loss' ? 'red' : 'green'}
                      >
                        {dice.betStatus === 'loss'
                          ? '-' + dice.amount
                          : '+' + dice.winAmount}
                      </span>
                    </td>
                  </tr>
                ))}
                {Array.isArray(crashAllBets) &&   crashAllBets.slice(0, 5).map((dice, index) => (
                  <tr id={index}>
                    <td className="game-icon">
                      <img src="./chart-increase-color.svg" />{' '}
                      <span className="crash">Crash</span>
                    </td>
                    <td>
                      <span className="name">{dice.username}</span>
                    </td>
                    <td>
                      <img src="./twemoji_coin.svg" />{' '}
                      <span>{dice.amount}</span>
                    </td>
                    <td>{dice.payout}x</td>
                    <td>
                      <img src="./twemoji_coin.svg" />{' '}
                      <span
                        className={dice.betStatus === 'loss' ? 'red' : 'green'}
                      >
                        {dice.betStatus === 'loss'
                          ? '-' + dice.amount
                          : '+' + dice.winAmount}
                      </span>
                    </td>
                  </tr>
                ))}
              </>
            )}
            {/* <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" />{' '}
                <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span className="green">+33600</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./chart-increase-color.svg" />{' '}
                <span className="crash">Crash</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" />{' '}
                <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span className="green">+33600</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" />{' '}
                <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span className="red">-100</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./chart-increase-color.svg" />{' '}
                <span className="crash">Crash</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" />{' '}
                <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span className="green">+33600</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" />{' '}
                <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span className="green">+33600</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./chart-increase-color.svg" />{' '}
                <span className="crash">Crash</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" />{' '}
                <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span className="red">-100</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./chart-increase-color.svg" />{' '}
                <span className="crash">Crash</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" />{' '}
                <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span className="red">-100</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" />{' '}
                <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span className="red">-100</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" />{' '}
                <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span className="green">+33600</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" />{' '}
                <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className="coin" src="./cryptocurrency-color_usd.svg" />{' '}
                <span className="green">+33600</span>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Livebets;
