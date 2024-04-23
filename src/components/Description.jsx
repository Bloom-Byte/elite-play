import React, { useState } from 'react';
import './Description.css';

const Description = ({ isNavOpen }) => {
  const [vipDetails, setVipDetails] = useState(false);

  return (
    <div className={`desc ${isNavOpen ? 'desc-extended' : ''}`}>
      <h5>Eliteplay- Dice and Crash</h5>
      <p>
        Eliteplay beckons you into a world of thrilling dice games and
        pulse-pounding crash experiences, where every roll and every tick of the
        clock holds the potential for epic rewards. Test your mettle in classic
        dice challenges, or feel the surge of adrenaline as you navigate the
        ever-increasing multiplier in our crash games.
      </p>
      <p>
        Here at Eliteplay, your gameplay fuels your success. Earn points and
        rewards with every turn of the dice and every calculated risk you take.
        These rewards can unlock a treasure trove of in-game items, grant you
        access to exclusive features that elevate your experience, and may even
        grant you real-world prizes – the choice is yours! (Modify this sentence
        based on the specific reward system)
      </p>
      {vipDetails && (
        <>
          <p>
            Eliteplay beckons you into a world of thrilling dice games and
            pulse-pounding crash experiences, where every roll and every tick of
            the clock holds the potential for epic rewards. Test your mettle in
            classic dice challenges, or feel the surge of adrenaline as you
            navigate the ever-increasing multiplier in our crash games.
          </p>
          <p>
            Here at Eliteplay, your gameplay fuels your success. Earn points and
            rewards with every turn of the dice and every calculated risk you
            take. These rewards can unlock a treasure trove of in-game items,
            grant you access to exclusive features that elevate your experience,
            and may even grant you real-world prizes – the choice is yours!
            (Modify this sentence based on the specific reward system)
          </p>
        </>
      )}
      <div onClick={() => setVipDetails(!vipDetails)} className="desc-cta">
        <span>{vipDetails ? 'See less' : 'See more'}</span>
        <img src="./arrow-right-double-round.svg" alt="arrow" />
      </div>
    </div>
  );
};

export default Description;
