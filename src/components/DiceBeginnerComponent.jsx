import React from 'react';
import './DiceBeginnerComponent.css';

const DiceBeginnerComponent = ({ isNavOpen }) => {
  return (
    <div className={`dicetutorial ${isNavOpen ? 'dicetutorial-extended' : ''}`}>
      <div className="dicetutorial-hero">
        <h1>Bitcoin Dice Roll Game Guide</h1>
        <img src="./die.png" alt="" />
      </div>
      <h3>What is Dice?</h3>
      <p>
        Dice is a provably fair online game that works on a cryptographic
        algorithm. It was first introduced in 2012 at a crypto casino and
        quickly became a favorite game among gamblers. Players can place bets on
        under and over and set their own multipliers for the game. The house
        edge may vary but for most crypto casinos like ELITEPLAY, it operates at
        only 1% which gives the players a good chance of winning. The best thing
        about this game is that you can verify your results mathematically,
        unlike other casino games. Different casinos may have different dynamics
        for the game, and players betting options but usually, you need to roll
        the dice to a number between 1-100 and place your wager on the outcome.
        This is how you roll the dice in playing online bitcoin dice.
      </p>
      <h3>How to Play Dice Gambling with eGold?</h3>
      <p>
        It's really simple to play craps. You need to register at any reputable
        crypto casino like ELITEPLAY, where it takes a few seconds to make an
        account. Once you have successfully registered, make a deposit with your
        desired cryptocurrency. Alternatively, you can also claim free coins
        from the faucet if the casino allows it. Now that you have some coins in
        your wallet either by deposit or faucet, you can now play the game.
        Below is a screenshot that explains everything about the online dice
        game.
      </p>
      <img style={{ width: '100%' }} src="./dicegame-screenshot.png" alt="" />
      <p>Here’s the breakdown of the above screenshot.</p>
      <p>
        1- Mode: There are mainly two modes of betting: Automated & Manual In
        Manual betting, you need to place bets and win chance manually for each
        bet. While in the automated betting mode, you can enter a particular bet
        amount for your first roll and give instructions on what to do after
        your bet wins or even when your bet loses. You can also enter when the
        automated betting shall stop, after some profit or loss.
      </p>
      <p>
        2- Under/Over: You can click on the “reverse” sign at the right side of
        the box to select under or over. To adjust your bet point, you can use
        the bar where it says “50” in the screenshot.
      </p>
      <p>
        3- Bet Amount: You can enter how much you want to wager for the next
        roll.
      </p>
      <p>
        4- Quick options: You can use these buttons to adjust your bet quickly
        before a dice roll. The “/2” will reduce your bet to half. The “2”
        option will double your bet. You can also use the “Min” and “Max”
        options to set the bet amount to a minimum and maximum, respectively.
      </p>
      <p>
        5- Roll: Once you have entered the bet amount, set your multiplier, and
        decided whether you want to bet over or under, you can press the “Roll”
        button to generate the result.
      </p>
      <p>
        6- Fairness: You can change your “Client” and “Server” seeds using this
        option. You can scroll down below to understand how the provably fair
        system actually works.
      </p>
      <h3>What is a Dice Roll, and how to verify it?</h3>
      <p>
        The result generated for each bet is termed as a "Roll" for the Dice
        game. A roll is generated from the combination of the client seed and
        the server seed. Each roll is unique since the data for each roll
        changes after every bet. Players enter their own client seed which
        directly influences the result of the roll. Since both the casino and
        the player enter their own seeds for each bet, neither the player nor
        the casino can cheat. You can use a third-party tool to verify your bets
        because decrypting the whole algorithm is really complicated. Here are
        some tools that you can use to verify your bets. <br /> Please note these are
        third-party tools, and you must do your due diligence before using them.
      </p>
    </div>
  );
};

export default DiceBeginnerComponent;
