import React, { useState } from 'react'
import './CrashTable.css'

const CrashTable = ({ isNavOpen, bets, userBets }) => {
    const [toggle, setToggle] = useState(false)
    const [userBetsOpen, setUserBetsOpen] = useState(false)
  return (
    <div className={`dicetable ${isNavOpen ? 'dicetable-extended' : ''}`}>
      <div className="dicebets-toggle">
        <button
          className={`${toggle ? 'desc-info' : 'dice-bets'}`}
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          Crash
        </button>
        <button
          className={`${toggle ? 'dice-bets' : 'desc-info'}`}
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          Description
        </button>
      </div>
      {toggle ? (
        <div className='dicetable-description-information'>
          <h3>Crash at ELITEPLAY: Overview</h3>
          <p>
            ELITEPLAY Crash is a popular and long-standing game in the online
            gambling industry. It is a dice game that utilizes blockchain
            technology for its fairness and transparency. The game is based on
            probability and involves calculating blockchain hash values and
            algorithms.
          </p>
          <p>Here's how the game generally works:</p>
          <p>
            1. Blockchain Technology: Blockchain is a decentralized and secure
            technology that ensures transparency and fairness in the game. The
            blockchain's hash values determine the game's outcomes, making it
            impossible for the platform to manipulate or tamper with the results
          </p>
          <p>
            2. Prediction and Rolling the Dice: Players predict a number within
            a specific range before rolling the dice. The range of numbers
            typically varies from game to game. After making their prediction,
            they initiate the roll.
          </p>
          <p>
            3. Randomly Generated Number: When the player rolls the dice, the
            system generates a random number. This number is determined by the
            blockchain's hash value calculation and algorithm, ensuring a truly
            random outcome.
          </p>
          <p>
            4. Probability of Winning: The player's probability of winning is
            determined by how close their predicted number is to the randomly
            generated number. Generally, the closer the prediction is to the
            actual outcome, the higher the probability of winning
          </p>
          <p>
            5. Winning and Payouts: If the player's prediction is accurate, they
            win the game and receive their payout based on the odds and the
            amount of their bet.
          </p>
          <h3>About Crash at ELITEPLAY</h3>
          <p>
            At ELITEPLAY Crash, players can enjoy a game with a deficient 1%
            House Edge, ensuring a fair and competitive environment. The process
            of generating results is meticulously calculated to maintain
            transparency and provable fairness.
          </p>
          <p>
            To determine the results, a series of steps are followed. First, the
            combination's hash value is calculated using HMAC_SHA256, which
            involves mixing the client seed and nonce with the server seed. This
            cryptographic process produces a 64-character hexadecimal string
            that is the basis for the random outcome: hash = HMAC_SHA256
            (clientSeed: nonce, serverSeed).
          </p>
          <p>
            From this hash, 8 characters are taken, and then they are converted
            into an int32 value. The conversion is crucial to ensure a number
            conforms to the dice range's constraints. This value is then divided
            by 0x100000000 and multiplied by 10001, and finally, divided by 100.
            This calculation ensures that the resulting number falls within the
            appropriate range for the dice game.
          </p>
          <p>
            It is essential to note that for each new round, a new seed is set
            to verify the previous data, and the server seed is encrypted to
            maintain the integrity of the process and guarantee fairness.
          </p>
          <p>
            BC.GAME takes pride in providing complete transparency and precision
            in their fair game of chance. These technical details might only be
            necessary for some players, but they are available for those who
            seek to understand the inner workings and ensure the game's
            fairness.
          </p>
          <p>
            So, with everything laid out transparently, players can confidently
            place their bets and enjoy the excitement of Classic Dice, knowing
            that the odds are fair and luck is on their side. Best of luck to
            all players rolling the dice at ELITEPLAY!
          </p>
          <h3>Dice at ELITEPLAY: Features</h3>
          <p>
            Dice at ELITEPLAY has several features designed to enhance the
            gaming experience and provide players with various options for
            gameplay and betting strategies. Let's take a closer look at the key
            features:
          </p>
          <p>
            1. Green Area Winners: In Classic Dice, only roll outcomes that hit
            the green area are considered winners. The game likely has a
            specific range, and if the rolled number falls within the green
            area, the player wins the bet.
          </p>
          <p>
            2. Prohibition on Using Personal Dice: Players cannot use their own
            dice in the game. The blockchain hash value calculation and
            algorithm determine the outcome, ensuring a fair and unbiased
            result.
          </p>
          <p>
            3. Optional Script Usage: ELITEPLAY allows players to use scripts
            for auto-betting, which automates the betting process based on
            predefined rules. However, it's important to note that using scripts
            is optional, and players must take full responsibility for any
            associated risks. The platform will not be held liable for any
            consequences related to script usage.
          </p>
          <h6>Auto Mode Operation Instructions:</h6>
          <div>
            <h5>- ON WIN: </h5>{' '}
            <p>
              Players can choose how the next bet amount will be determined when
              they win. It can either "Increase by _(your set)_," meaning the
              bet amount will increase by a specific value after each win, or
              "Reset to initial amount," indicating that the bet amount will go
              back to its starting value after a win.
            </p>
          </div>
          <div>
            <h5>- ON LOSE: </h5>{' '}
            <p>
              When players lose a bet, they can decide how the next bet amount
              will be adjusted. It can either "Increase by _(your set)_,"
              meaning the bet amount increases by a set value after each loss,
              or "Reset to the initial amount," signifying that the bet amount
              returns to its original value after a loss.
            </p>
          </div>
          <div>
            <h5>- STOP ON WIN: </h5>{' '}
            <p>
              Players can set a target amount they want to reach from the start
              of the betting session. If the total amount won reaches or exceeds
              this target, the auto mode will stop, allowing players to secure
              their winnings.
            </p>
          </div>
          <div>
            <h5>- STOP ON LOSS: </h5>{' '}
            <p>
              Players can set a limit for the total amount they are willing to
              lose during the betting session. If the total amount lost exceeds
              this limit, the auto mode will stop, preventing further losses.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="dicetable-section">
            <div className="dicetable-betstitle">
            <div onClick={() => {setUserBetsOpen(!userBetsOpen)}} className={userBetsOpen? 'dicetable-betstitle_all-bets' : 'dicetable-betstitle_my-bets'}>All Bets</div>
              <div onClick={() => {setUserBetsOpen(!userBetsOpen)}} className={userBetsOpen? 'dicetable-betstitle_my-bets' : 'dicetable-betstitle_all-bets'}>My Bets</div>
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
                {userBetsOpen ? (
                    userBets?.map((bet, index) => (
                      <tr>
                        <td className="game-icon">{bet._id}</td>
                        <td>
                          <img
                            className="coin"
                            src="./twemoji_coin.svg"
                            alt="coin"
                          />
                          {bet.amount}
                        </td>
                        <td>{bet.payout}x</td>
                        <td
                          className={bet.betStatus === 'loss' ? 'red' : 'green'}
                        >
                          {' '}
                          <img
                            className="coin"
                            src="./twemoji_coin.svg"
                            alt="coin"
                          />
                          {bet.winAmount}x
                        </td>
                      </tr>
                    ))
                  ) : (
                    bets.length > 0 ? (
                      bets.map((bet, index) => (
                        <tr key={index}>
                          <td className="game-icon">{bet._id}</td>
                          <td>
                            <img
                              className="coin"
                              src="./twemoji_coin.svg"
                              alt="coin"
                            />
                            {bet.amount}
                          </td>
                          <td>{bet.payout}x</td>
                          <td
                            className={bet.betStatus === 'loss' ? 'red' : 'green'}
                          >
                            <img
                              className="coin"
                              src="./twemoji_coin.svg"
                              alt="coin"
                            />
                            {bet.winAmount}x
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No bets available</td>
                      </tr>
                    )
                  )}
                 
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CrashTable