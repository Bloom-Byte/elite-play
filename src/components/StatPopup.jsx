import './StatPopup.css'
import Modal from './Modal'

const StatPopup = ({ isOpen, close, totalWins, totalBets, totalWagered }) => {
  return (
    <Modal title={"Statistics"} isOpen={isOpen} close={close}>
      <select className='stat-choice' name="" id="">
        <option value="dice">Dice</option>
        <option value="crash">Crash</option>
      </select>
      <div className="statcards-container">

        <div className="statcards">
          <div className="statcard">
            <p>Total Wins</p>
            <h5>{totalWins}</h5>
          </div>
          <div className="statcard">
            <p>Total Bets</p>
            <h5>{totalBets}</h5>
          </div>
          <div className="statcard">
            <p>Total Wagered</p>
            <h5>{totalWagered}</h5>
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
    </Modal>
  )
}

export default StatPopup