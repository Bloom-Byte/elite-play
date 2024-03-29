import React from 'react'
import './StatPopup.css'

const StatPopup = ({setIsStatPopupOpen, isStatPopupOpen}) => {
  return (
    <div className="userinfopopup">
    <div className="userinfopopup-content">
      <div className="userinfopopup-header">
        <p>Statistics</p>
        <img
          onClick={() => {
            setIsStatPopupOpen(!isStatPopupOpen);
            }}
          src="./cancel-x.svg"
          alt="cancel-icon"
        />
      </div>
        <select className='stat-choice' name="" id="">
            <option value="dice">Dice</option>
            <option value="crash">Crash</option>
        </select>
      <div className="statcards-container">
        
        <div className="statcards">
          <div className="statcard">
            <p>Total Wins</p>
            <h5>3377</h5>
          </div>
          <div className="statcard">
            <p>Total Bets</p>
            <h5>4771</h5>
          </div>
          <div className="statcard">
            <p>Total Wagered</p>
            <h5>18,1...</h5>
          </div>
        </div>
      </div>
      <div className='stattable'>
        <table>
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Wagered</th>
                    <th>Profit</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>eGold</td>
                    <td>100</td>
                    <td className='green'>+1000</td>
                </tr>
                <tr>
                    <td>eGold</td>
                    <td>100</td>
                    <td className='green'>+1000</td>
                </tr>
                <tr>
                    <td>eGold</td>
                    <td>100</td>
                    <td className='red'>-100</td>
                </tr>
                <tr>
                    <td>eGold</td>
                    <td>100</td>
                    <td className='green'>+1000</td>
                </tr>
                <tr>
                    <td>eGold</td>
                    <td>100</td>
                    <td className='green'>+1000</td>
                </tr>
                <tr>
                    <td>eGold</td>
                    <td>100</td>
                    <td className='red'>-100</td>
                </tr>
            </tbody>
        </table>
      </div>
      <div className='stattable-arrows'>
        <span className='curr-page'>Total 1</span>
        <span className='curr-page-num'>1</span>
        <img src="./Previous.svg" alt="previous-arrow" />
                <img src="./Next.svg" alt="next-arrow" />
      </div>
    </div>
  </div>
  )
}

export default StatPopup