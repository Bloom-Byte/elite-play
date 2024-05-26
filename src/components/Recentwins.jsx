import { toFixed } from '../utils/helpers';
import './Recentwins.css';

function mixTwoArraysRandomly(arr1, arr2) {
  const mixedArray = [];
  while (arr1.length > 0 && arr2.length > 0) {
    const randomIndex = Math.floor(Math.random() * 2);
    if (randomIndex === 0) {
      mixedArray.push(arr1.shift());
    } else {
      mixedArray.push(arr2.shift());
    }
  }
  while (arr1.length > 0) {
    mixedArray.push(arr1.shift());
  }
  while (arr2.length > 0) {
    mixedArray.push(arr2.shift());
  }
  return mixedArray;
}

const Recentwins = ({ diceAllBets, crashAllBets }) => {
  const diceRecentwins = diceAllBets.length > 0 ? diceAllBets.filter(
    (bet) => bet.betStatus === 'win'
  ) : [];

  const crashRecentwins = crashAllBets.length > 0 ? crashAllBets.filter(
    (bet) => bet.status === 'win'
  ) : [];

  const mixedRecentWins = mixTwoArraysRandomly([...diceRecentwins], [...crashRecentwins]);

  const isDice = (bet) => bet.status === undefined;

  return (
    <div className={`recent-wins`}>
      <div className="recent-wins__title">
        <div className="active-wins"> </div>
        <h4>Recent Wins</h4>
      </div>
      <div className="recent-wins__container">
        {mixedRecentWins.length > 0 &&
          mixedRecentWins.map((dice, index) => {
            if (isDice(dice)) {
              return (
                <div id={index} className="recent-wins__container__item" key={index}>
                  <img src="./dice-win.svg" alt="dice-win" />
                  <div className="recent-wins__coin-info">
                    <img src="./twemoji_coin.svg" alt="" />
                    <span>{dice.username}</span>
                  </div>
                  <p className="recent-wins__egold">eGold {toFixed(dice.winAmount, 4)}</p>
                </div>
              )
            } else {
              return (
                <div id={index} className="recent-wins__container__item" key={index}>
                  <img src="./crash-win.svg" alt="dice-win" />
                  <div className="recent-wins__coin-info">
                    <img src="./twemoji_coin.svg" alt="" />
                    <span>{dice.username}</span>
                  </div>
                  <p className="recent-wins__egold">eGold {toFixed(dice.payout, 4)}</p>
                </div>
              )
            }
          })}
        {/* {diceRecentwins.length > 0 &&
          diceRecentwins.slice(0, 5).map((dice, index) => (
            <div id={index} className="recent-wins__container__item" key={index}>
              <img src="./dice-win.svg" alt="dice-win" />
              <div className="recent-wins__coin-info">
                <img src="./twemoji_coin.svg" alt="" />
                <span>{dice.username}</span>
              </div>
              <p className="recent-wins__egold">eGold {toFixed(dice.winAmount, 4)}</p>
            </div>
          ))}
        {crashRecentwins.length > 0 &&
          crashRecentwins.slice(0, 5).map((crash, index) => (
            <div id={index} className="recent-wins__container__item" key={index}>
              <img src="./crash-win.svg" alt="dice-win" />
              <div className="recent-wins__coin-info">
                <img src="./twemoji_coin.svg" alt="" />
                <span>{crash.username}</span>
              </div>
              <p className="recent-wins__egold">eGold {toFixed(crash.payout, 4)}</p>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default Recentwins;
