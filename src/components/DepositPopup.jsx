import React, { useState } from 'react';
import './DepositPopup.css';

const DepositPopup = ({ depositPopupOpen, setDepositPopupOpen, user }) => {
  const [depositAmountpop, setDepositAmountpop] = useState(0);
  const [depositAccountIdpop, setDepositAccountIdpop] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validatemessage, setValidateMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const copyToClipboard = (text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;

    document.body.appendChild(tempInput);

    tempInput.select();

    document.execCommand('copy');

    document.body.removeChild(tempInput);

    alert('Copied to clipboard: ' + text);
  };

  const handleDepositChange = (event) => {
    setDepositAmountpop(event.target.value);
  };

  const handleDepositAccountId = (event) => {
    setDepositAccountIdpop(event.target.value);
  };

  const depositToEliteplay = async () => {
    const url = 'https://be.eliteplay.bloombyte.dev/transactions/deposit';
    const accessToken = localStorage.getItem('accessToken');
    setIsLoading(true);

    if (depositAmountpop < 1) {
      setValidateMessage('Minimum Deposit is 1 eGold');
      setIsLoading(false);
      return;
    }

    const requestBody = {
      amount: depositAmountpop,
      accountId: depositAccountIdpop,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: requestBody,
      });

      if (response.status === 201) {
        const responseData = await response.json();
        setSuccessMessage(responseData.data.message);
      } else {
        throw new Error('Failed to deposit');
      }
    } catch (error) {
      console.error('Error occurred during deposit:', error);
      setValidateMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="depositpopup">
      <div className="depositpopup-content">
        <div className="depositpopup-header">
          <h3>Deposit</h3>
          <img
            onClick={() => {
              setDepositPopupOpen(!depositPopupOpen);
            }}
            src="./cancel-x.svg"
            alt="cancel-close"
          />
        </div>
        <div className='depositcontent-main-content'>
            <div style={{paddingLeft: '20px'}} className="depositpopup-box">
              <p>Deposit Currency</p>
              <select name="" id="">
                <img src="./twemoji_coin.svg" alt="coin" disabled={true} />
                <option value="egold">eGold</option>
              </select>
            </div>
          <div className="deposit-details">
            <p>Account Id</p>
            <div className="deposit-address">
              <span className="eg-address">
                <span className="eAddress">8722767</span>
              </span>
              <span
                onClick={() => {
                  copyToClipboard('8722767');
                }}
                className="copy-bx"
              >
                <img src="./copy-01.svg" alt="" /> copy
              </span>
            </div>
            <p>User Id</p>
            <div className="deposit-address">
              <span className="eg-address">
                <span className="eAddress">{user?._id}</span>
              </span>
              <span
                onClick={() => {
                  copyToClipboard(user?._id);
                }}
                className="copy-bx"
              >
                <img src="./copy-01.svg" alt="" /> copy
              </span>
            </div>
            {/* <p>Deposit Amount</p>
            <div className="withdraw-address-box">
              <input
                className="withdraw-address_input"
                type="text"
                value={depositAmountpop}
                onChange={handleDepositChange}
              />
            </div> */}
            {/* <p>Account Id</p>
            <div className="withdraw-address-box">
              <input
                className="withdraw-address_input"
                type="text"
                value={depositAccountIdpop}
                onChange={handleDepositAccountId}
              />
            </div> */}
            <div className="deposit_fiat-btn">
              {/* <button onClick={depositToEliteplay}>
                {isLoading ? (
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  'Deposit'
                )}
              </button> */}
            </div>
            {/* {validatemessage && (
              <p style={{ color: '#E14453' }}>{validatemessage}</p>
            )}
            {successMessage && (
              <p style={{ color: '#34B263' }}>{successMessage}</p>
            )} */}
          </div>
          <div className="depositpopup-min">
            <img src="./alert-01.svg" alt="alert-icon" />
            <span>Minimum Deposit: 1 eGold</span>
          </div>
          <div className="depositpopup-notice">
            <span className="notice-txt">NOTICE: </span>{' '}
            <span>
            Please wait for your deposit to reflect 30 mins after transanction.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPopup;
