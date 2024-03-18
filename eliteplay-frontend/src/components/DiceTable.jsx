import React, { useState } from 'react'
import './DiceTable.css'

const DiceTable = ({ isNavOpen }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className={`dicetable ${isNavOpen ? 'dicetable-extended' : ''}`}>
      <div className="dicebets-toggle">
        <button className="dice-bets">Dice</button>
        <button className="desc-info">Description</button>
      </div>
      <div className="dicetable-section">
        <div className='dicetable-betstitle'>
            <div className='dicetable-betstitle_all-bets'>All Bets</div>
            <div className='dicetable-betstitle_my-bets'>My Bets</div>
        </div>
        <div>
          <table className="livebets-table_table">
            <thead>
              <tr>
                <th>Bet ID</th>
                <th>Time</th>
                <th>Wager</th>
                <th>Multiplier</th>
                <th>Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="game-icon">tkfsyaudyubnlkxblk</td>
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
                <td className="game-icon">tkfsyaudyubnlkxblk</td>
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
                <td className="game-icon">tkfsyaudyubnlkxblk</td>
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
                <td className="game-icon">tkfsyaudyubnlkxblk</td>
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
                <td className="game-icon">tkfsyaudyubnlkxblk</td>
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
                <td className="game-icon">tkfsyaudyubnlkxblk</td>
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
                <td className="game-icon">tkfsyaudyubnlkxblk</td>
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
                <td className="game-icon">tkfsyaudyubnlkxblk</td>
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
                <td className="game-icon">tkfsyaudyubnlkxblk</td>
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
                <td className="game-icon">tkfsyaudyubnlkxblk</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DiceTable
