import React, { useState} from 'react'
import './Livebets.css'

const Livebets = ({isNavOpen}) => {
  const [liveBets, setLiveBets] = useState([])
  const [bigBets, setBigBets] = useState([])
  return (
    <div className={`livebets ${isNavOpen ? 'livebets-extended' : ''}`}>
      <h5>Live Bets</h5>
      <div className="livebets-toggle">
        <button className='all-bets'>All Bets</button>
        <button className='big-bets'>Big Bets</button>
      </div>
      <div className="livebets-table">
        <table className="livebets-table_table">
          <thead>
            <tr>
              <th>Game</th>
              <th>Player</th>
              <th>Time</th>
              <th>Wager</th>
              <th>Multiplier</th>
              <th>Payout</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" /> <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span className='green'>+33600</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./chart-increase-color.svg" />{' '}
                <span className="crash">Crash</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" /> <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span className='green'>+33600</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" /> <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span className='red'>-100</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./chart-increase-color.svg" />{' '}
                <span className="crash">Crash</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" /> <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span className='green'>+33600</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" /> <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span className='green'>+33600</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./chart-increase-color.svg" />{' '}
                <span className="crash">Crash</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" /> <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span className='red'>-100</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./chart-increase-color.svg" />{' '}
                <span className="crash">Crash</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" /> <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span className='red'>-100</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" /> <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span className='red'>-100</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" /> <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span className='green'>+33600</span>
              </td>
            </tr>
            <tr>
              <td className="game-icon">
                <img src="./dice-color.svg" />{' '}
                <span className="dice">Dice</span>
              </td>
              <td>
                <img src="./twemoji_coin.svg" /> <span className="name">Yuxeer</span>
              </td>
              <td>2s</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span>100</span>
              </td>
              <td>3.56x</td>
              <td>
                <img className='coin' src="./cryptocurrency-color_usd.svg" /> <span className='green'>+33600</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Livebets
