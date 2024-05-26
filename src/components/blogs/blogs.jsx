/* eslint-disable react-refresh/only-export-components */
export const HowToDeposit = () => {
  return (
    <div>
      <p>
        If you own cryptocurrencies on another platform or wallet,
        you can transfer them to your Trust Dice Wallet.
      </p>
      <ol>
        <li>
          Log in to your Eliteplay account, click [Deposit] and
          you will see a pop-up window.
        </li>
        <div className="img-box"></div>
        <li>Click [Crypto Deposit].</li>
        <div className="img-box"></div>
        <li>
          Choose the cryptocurrency you want to deposit, for
          example, USDT.
        </li>
        <div className="img-box"></div>
        <li>
          Next, choose the deposit network. Please make sure that
          the selected network is the same as the network of the
          platform you are withdrawing funds from. If you select
          the wrong network, you’ll lose your funds.
        </li>
        <div className="img-box"></div>
        <li>
          Click to copy and paste the deposit address to the
          address field on the platform you intend to withdraw the
          crypto from. Alternatively, you can use the QR code of
          the address to complete the transaction.
        </li>
        <div className="img-box"></div>
        <li>
          It takes time for the transaction to be confirmed. The
          confirmation time varies depending on the blockchain and
          its current network traffic. Once the transfer is
          processed, the funds will be credited to your Eliteplay
          account shortly after.
        </li>
        <div className="img-box"></div>
      </ol>
    </div>
  );
}

export const blogs = [
  {
    title: "How to Deposit?",
    subtitle: "Deposit Bitcoin, Ethereum or any other cryptocurrency!",
    content: HowToDeposit(),
  },
  {
    title: "How to Withdraw?",
    subtitle: "Withdraw Bitcoin, Ethereum or any other cryptocurrency!",
    content: HowToDeposit(),
  },
  {
    title: "What promotions are available to try?",
    subtitle: "Find out the best promotions available to you!",
    content: HowToDeposit(),
  },
  {
    title: "How can i verify the result of a dice?",
    subtitle: "Verify the authenticity of the dice results!",
    content: HowToDeposit(),
  },
]
