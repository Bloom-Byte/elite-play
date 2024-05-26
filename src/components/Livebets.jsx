import React, { useState } from 'react';
import './Livebets.css';
import { useAppContext } from '../hooks/useAppContext';
import { toFixed } from '../utils/helpers';

const DataTable = ({ diceAllBets, crashAllBets }) => {
  return (<table className="livebets-table_table">
    <thead>
      <tr>
        <th>Game</th>
        <th>Player</th>
        <th>Wager</th>
        <th>Multiplier</th>
        <th>Payout</th>
        <th>Profit</th>
      </tr>
    </thead>
    <tbody>
      {(
        <>
          {Array.isArray(diceAllBets) && diceAllBets.slice(0, 5).map((dice, index) => {
            const profit = Math.max(dice.winAmount - dice.amount, 0);
            return (
              <tr id={index} key={index}>
                <td className="game-icon">
                  <img src="./dice-color.svg" />{' '}
                  <span className="dice">Dice</span>
                </td>
                <td>
                  <span className="name">{dice.username}</span>
                </td>
                <td>
                  <div className='flexed'>
                    <img src="./twemoji_coin.svg" />{' '}
                    <span>{dice.amount}</span>
                  </div>
                </td>
                <td>{dice.payout}x</td>
                <td>
                  <div className='flexed'>
                    <img src="./twemoji_coin.svg" />{' '}
                    <span
                      className={dice.betStatus === 'loss' ? 'red' : 'green'}
                    >
                      {toFixed(dice.winAmount, 4)}
                    </span>
                  </div>
                </td>
                <td>
                  <div className='flexed'>
                    <img src="./twemoji_coin.svg" />{' '}
                    <span
                      className={dice.betStatus === 'loss' ? 'red' : 'green'}
                    >
                      {toFixed(profit, 4)}
                    </span>
                  </div>
                </td>
              </tr>
            )
          })}
          {Array.isArray(crashAllBets) && crashAllBets.slice(0, 5).map((dice, index) => {
            const profit = Math.max(dice.payout - dice.amount, 0);
            return (
              <tr id={index} key={index}>
                <td className="game-icon">
                  <img src="./chart-increase-color.svg" />{' '}
                  <span className="crash">Crash</span>
                </td>
                <td>
                  <span className="name">{dice.username}</span>
                </td>
                <td>
                  <div className='flexed'>
                    <img src="./twemoji_coin.svg" />{' '}
                    <span>{toFixed(dice.amount, 4)}</span>
                  </div>
                </td>
                <td>{dice.cashOutPoint}x</td>
                <td>
                  <div className='flexed'>
                    <img src="./twemoji_coin.svg" />{' '}
                    <span
                      className={dice.status === 'loss' ? 'red' : 'green'}
                    >
                      {toFixed(dice.payout, 4)}
                    </span>
                  </div>
                </td>
                <td>
                  <div className='flexed'>
                    <img src="./twemoji_coin.svg" />{' '}
                    <span
                      className={dice.status === 'loss' ? 'red' : 'green'}
                    >
                      {toFixed(profit, 4)}
                    </span>
                  </div>
                </td>
              </tr>
            )
          })}
        </>
      )}
    </tbody>
  </table>)
}

const Livebets = ({
  diceAllBets,
  crashAllBets,
}) => {
  const { state } = useAppContext();
  const [bigBets, setBigBets] = useState(false);
  return (
    <div className={`livebets`}>
      <h5>Live Bets</h5>
      <div className="livebets-toggle">
        <button onClick={() => setBigBets(!bigBets)} className={`${bigBets ? 'big-bets' : 'all-bets'}`} >All Bets</button>
        <button onClick={() => setBigBets(!bigBets)} className={`${bigBets ? 'all-bets' : 'big-bets'}`} >Big Bets</button>
      </div>
      <div className="livebets-table">
        {bigBets ? (
          <DataTable diceAllBets={diceAllBets.filter(
            (bet) => bet.amount >= 20
          )} crashAllBets={crashAllBets.filter(
            (bet) => bet.amount >= 20
          )}/>
        ) : (
          <DataTable diceAllBets={diceAllBets} crashAllBets={crashAllBets} />
        )}
      </div>
    </div>
  );
};

export default Livebets;
