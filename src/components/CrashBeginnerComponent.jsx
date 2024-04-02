import React from 'react';
import './CrashBeginnerComponent.css'

const CrashBeginnerComponent = ({ isNavOpen }) => {
  return (
    <div className={`dicetutorial ${isNavOpen ? 'dicetutorial-extended' : ''}`}>
      <div className="dicetutorial-hero">
        <h1>Bitcoin Crash Gambling Guide</h1>
        <img src="./crash-img.png" alt="" />
      </div>
      <h3>What is Bitcoin Crash Gambling?</h3>
      <p>
        Crash is an innovative game that originated from crypto casinos and is
        one of the most popular provably fair game. There are different variants
        of the game available at different casinos but they all have a similar
        manner in which it works. A rocket starts going up and will crash at a
        particular multiplier, and players need to cash their bets before the
        rocket crashes down.
      </p>
      <p>
        {' '}
        It is a thrilling experience to play a crash game because it requires a
        good balance of greed and panic. If you cash out too early, you may
        regret watching the rocket go high, while if you get greedy and the
        rocket crashes, you will lose all the potential profits.
      </p>
      <h3>How to Play Dice Gambling with eGold?</h3>
      <p>How to play the crash gambling game?</p>
      <img style={{ width: '100%' }} src="./crash-screenshot.png" alt="" />
      <h3>Useful tips for betting on the crash game</h3>
      <p>
        <span className='white'>1- Manual/AutoBetting:</span> You can choose either of the
        options. While the manual betting mode is more thrilling, the automatic
        mode is easier for applying strategies to the game automatically. Lots
        of players use strategies like martingale with auto betting. It can be
        hectic to manually apply the strategies, but then manual betting is just
        so much fun.
      </p>
      <p>
        <span className='white'>2- Bet amount:</span> You can choose the amount you want to bet
        on the next round and click “Join” to place your bet. After joining the
        round, you will see a “Cash Out” button as shown below. Pressing it will
        cash your bet at the current multiplier and secure your winnings for
        that round.
      </p>
      <p>
        <span className='white'>3- Previous Results:</span> You can always see the previous
        results of the crash game and deploy your strategy based on that. If the
        rocket has crashed at small multipliers, it might be time for a big one
        next round and if the rocket went huge in previous rounds, then it might
        be wise to wait for a few silent rounds. Plan and apply your own winning
        strategy!
      </p>
      <p>
        <span className='white'>4- Settings:</span>  You can enable/disable sounds,
        animations, and the max bet. Be careful when you enable the max bet
        because it means you are betting all of your funds in a single bet.
      </p>
      <p>
        <span className='white'>5- Other Players in the round:</span>   As you can see, there are
        lots of players playing in each round. You can watch who wins in the
        round and who was too greedy as the rocket crashed.
      </p>
      <h3>Useful tips for betting on the crash game</h3>
      <p>
        Although nothing can guarantee you profits for the long term, there are
        some points to keep in mind which will definitely increase your chances
        of winning and make your gambling experience more exciting
      </p>
      <ul className='useful-list'>
        <li>
          <span className='white'>Don’t be greedy: </span>While playing a crash game, players get
          too greedy and keep expecting the rocket to go higher. Always set your
          target payout to something realistic and repeatable. You cannot expect
          the rocket to go 100x every round. 
        </li>
        <li>
          <span className='white'>Don’t be too passive: </span>
           It’s important to avoid cashing your bets too early because every now
          and then, the rocket will crash at the base multiplier, and it’s wise
          to play for decent multipliers. Don’t be too greedy while also don’t
          get too passive with small multipliers.
        </li>
        <li>
          <span className='white'>Use the Auto-Cashout feature: </span> Not every casino that
          offers the crash game providers this feature. Hence, it’s important to
          utilize the Auto-Cashout feature available at ELITEPLAY to cash out
          the bet at a set multiplier because the game happens in real-time, and
          a slight internet lag can cost you money.
        </li>
      </ul>
      <p>
        You can try strategies like Martingale, in which you double the bet
        amount each time you lose and reset every time you win. But if you are
        applying strategies like martingale which are explosive in nature, keep
        the base bet amount smaller.
      </p>
    </div>
  );
};

export default CrashBeginnerComponent;
