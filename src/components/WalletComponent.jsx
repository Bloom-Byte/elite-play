import React, { useCallback, useEffect, useState } from 'react';
import './WalletComponent.css';
import instance from '../utils/api';
import { useAppContext } from '../hooks/useAppContext';
import { useCopyToClipboard } from '../hooks/useCopy';
import { Box, Divider, useToast } from '@chakra-ui/react';
import { isElementClassOrChildOf } from '../utils/dom';
import { useDeposit } from '../hooks/useDeposit';
import { ADDRESS } from '../utils/constants';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import moment from 'moment';

const WalletComponent = () => {
  const [currentSection, setCurrentSection] = useState('Balance');
  const [mobileNav, setMobileNav] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [withdrawalAccount, setWithdrawalAccount] = useState('');
  const [transactions, setTransactions] = useState([]);

  const { state } = useAppContext();
  const toast = useToast();

  const handleWithdrawalChange = (event) => {
    const value = parseFloat(event.target.value);
    if (isNaN(value)) {
      return;
    }
    if (value < 50) {
      setWithdrawalAmount(50);
    } else {
      setWithdrawalAmount(value);
    }
  };

  const handleWithdrawalAccount = (event) => {
    setWithdrawalAccount(event.target.value);
  };

  const copyToClipboard = useCopyToClipboard();

  const { isLoading, depositToEliteplay } = useDeposit();

  async function initiateWithdrawal() {
    const url = '/transactions/withdraw';

    if (state.user.balance < withdrawalAmount) {
      toast({
        title: 'Insufficient balance',
        description: 'You do not have enough balance to make this withdrawal',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    const requestBody = {
      amount: withdrawalAmount,
      eliteUserId: withdrawalAccount,
    };

    try {
      const response = await instance.post(url, requestBody);

      if (response.status === 201) {
        toast({
          title: 'Withdrawal initiated',
          description: 'Your withdrawal has been initiated successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      } else {
        console.error('Failed to initiate transaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while initiating transaction:', error);
      toast({
        title: 'Failed to initiate withdrawal',
        description: 'An error occurred while initiating withdrawal',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }

  const fetchTransactions = useCallback(async () => {
    const url = '/transactions/history';

    try {
      const response = await instance.get(url);

      if (response.status !== 200) {
        toast({
          title: 'Failed to fetch transactions',
          description: 'An error occurred while fetching transactions',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        return;
      }

      setTransactions(response.data.transactions);
    } catch (error) {
      if (error.response.status === 404) {
        toast({
          title: 'No transactions found',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        return;
      }
      console.error('Error occurred while fetching transactions:', error);
      toast({
        title: 'Failed to fetch transactions',
        description: 'An error occurred while fetching transactions',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
  }, [toast]);

  useEffect(() => {
    if (currentSection === 'Transaction') {
      fetchTransactions();
    }
  }, [currentSection, fetchTransactions]);

  const close = useCallback(() => {
    setMobileNav(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isElementClassOrChildOf(event.target, 'accountDropDown')
      ) {
        close();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close]);

  return (
    <div className={`wallet-comp`}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="wallet-setting-header">
          <span>Wallet</span>
        </div>
        <div className='accountDropDown' style={{
          position: 'relative',
        }}>
          <div
            onClick={() => {
              setMobileNav(!mobileNav);
            }}
            className="accountsettings-mobile_nav"
          >
            <img src="./slant-menu.svg" alt="" />
          </div>
          {mobileNav && (
            <div className="settings-dropdown">
              <div className="settings-dropdown-content">
                <div
                  onClick={() => {
                    setCurrentSection('Balance');
                    close();
                  }}
                  className={`profile-dropdown-cta ${currentSection === 'Balance' ? 'active' : ''}`}
                >
                  <img src="./wallet-02.svg" alt="wallet" />
                  <span>Balance</span>
                </div>
                <div
                  onClick={() => {
                    setCurrentSection('Deposit');
                    close();
                  }}
                  className={`profile-dropdown-cta ${currentSection === 'Deposit' ? 'active' : ''}`}
                >
                  <img src="./money-receive-01.svg" alt="wallet" />
                  <span>Deposit</span>
                </div>
                <div
                  onClick={() => {
                    setCurrentSection('Withdraw');
                    close();
                  }}
                  className={`profile-dropdown-cta ${currentSection === 'Withdraw' ? 'active' : ''}`}
                >
                  <img src="./bitcoin-withdraw.svg" alt="wallet" />
                  <span>Withdraw</span>
                </div>
                {/* <div
                  onClick={() => {
                    setCurrentSection('Earnings')
                    close();
                  }}
                  className={`profile-dropdown-cta ${currentSection === 'Earnings' ? 'active' : ''}`}
                >
                  <img src="./coins-01.svg" alt="wallet" />
                  <span>Earnings</span>
                </div> */}
                <Divider mb={'0px !important'} />
                <div
                  onClick={() => {
                    setCurrentSection('Transaction');
                    close();
                  }}
                  className={`profile-dropdown-cta ${currentSection === 'Transaction' ? 'active' : ''}`}
                >
                  <img src="./bitcoin-transaction.svg" alt="wallet" />
                  <span>Transaction</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="wallet-comps">
        <div className="wallet-comp_wallet-options">
          <div
            onClick={() => setCurrentSection('Balance')}
            className={`wallet-option ${currentSection === 'Balance' ? 'wallet-option_active' : ''
              }`}
          >
            <img src="./wallet-02.svg" alt="wallet" />
            <span>Balance</span>
          </div>
          <div
            onClick={() => setCurrentSection('Deposit')}
            className={`wallet-option ${currentSection === 'Deposit' ? 'wallet-option_active' : ''
              }`}
          >
            <img src="./money-receive-01.svg" alt="wallet" />
            <span>Deposit</span>
          </div>
          <div
            onClick={() => setCurrentSection('Withdraw')}
            className={`wallet-option ${currentSection === 'Withdraw' ? 'wallet-option_active' : ''
              }`}
          >
            <img src="./bitcoin-withdraw.svg" alt="wallet" />
            <span>Withdraw</span>
          </div>
          {/* <div className="wallet-option" onClick={() => setCurrentSection('Earnings')}>
            <img src="./coins-01.svg" alt="wallet" />
            <span>Earnings</span>
          </div> */}
          <div
            onClick={() => setCurrentSection('Transaction')}
            className={`wallet-option ${currentSection === 'Transaction' ? 'wallet-option_active' : ''
              }`}
          >
            <img src="./bitcoin-transaction.svg" alt="wallet" />
            <span>Transaction</span>
          </div>
        </div>
        <div className="wallet-comp_wallet-info">
          {currentSection === 'Balance' && (
            <div>
              <div className="wallet-comp_wallet-balance">
                <div className="pot-info">
                  <img src="./pot-coin.svg" alt="" />
                  <div className="pot-balance">
                    <span className="real-balance">Total Balance</span>
                    <span className="real-balance_amount">
                      eGold {state.user?.balance}
                    </span>
                  </div>
                </div>
                <hr className="potline" />
                <div className="pot-balance">
                  <span>Real Balance</span>
                  <span>eGold {state.user?.balance}</span>
                </div>
                <div className="pot-balance">
                  <span>Bonus Balance</span>
                  <span>eGold {state.user?.balance}</span>
                </div>
              </div>
              <div className="mainBalance-section">
                <div className="mainBalance-fiat-currency">
                  <div className="currency-title">
                    <img src="./twemoji_coin.svg" alt="crypto" />
                    <span>eGold</span>
                  </div>
                  <div className="mainBalance-amount">
                    <span>{state.user?.balance}</span>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => setCurrentSection('Deposit')}
                    >
                      Deposit
                    </span>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => setCurrentSection('Withdraw')}
                    >
                      Withdraw
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentSection === 'Deposit' && (
            <div className="wallet-deposit">
              <div className="deposit-wallet_main">
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  marginBottom: '30px',
                }}>
                  <div className='deposit-cp'>
                    <p>Deposit Currency</p>
                    <div className="deposit-address">
                      <span className="eg-address">
                        <span className="eAddress">eGold</span>
                      </span>
                    </div>
                  </div>
                  <div className='deposit-cp'>
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
                  </div>
                  <div className='deposit-cp'>
                    <p>User Id</p>
                    <div className="deposit-address">
                      <span className="eg-address">
                        <span className="eAddress">{state.user?._id}</span>
                      </span>
                      <span
                        onClick={() => {
                          copyToClipboard(state.user?._id);
                        }}
                        className="copy-bx"
                      >
                        <img src="./copy-01.svg" alt="" /> copy
                      </span>
                    </div>
                  </div>
                </div>
                <div className="depositpopup-min">
                  <img src="./alert-01.svg" alt="alert-icon" />
                  <span>Minimum Deposit: 1 eGold</span>
                </div>
                <div className="depositpopup-min">
                  <img src="./alert-01.svg" alt="alert-icon" />
                  <span>Please add your user id as description in the transaction</span>
                </div>
                <button className='makeDeposit' onClick={() => {
                  const redirectUrl = `https://www.elitepvpers.com/theblackmarket/profile/${ADDRESS}`;
                  toast({
                    title: 'Redirecting to Elitepvypers',
                    description: `You will be redirected to elitepvpers.com in 5 seconds to make a deposit to ${ADDRESS}. If you are not automatically redirected, use the following link: ${redirectUrl}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                  });
                  setTimeout(() => {
                    window.open(redirectUrl, '_blank');
                  }, 5000);
                }}>
                  Make a deposit
                </button>
                <div className="deposit_fiat-btn">
                  <button onClick={depositToEliteplay}>
                    {isLoading ? (
                      <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      'Confirm Deposit'
                    )}
                  </button>
                </div>
                <div className="crypto-notice">
                  <span className="crypto-notice_notice-head">
                    NOTICE:{' '}
                  </span>
                  <span className="crypto-notice_notice-info">
                    Please wait for your deposit to reflect 30 mins after transanction.
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentSection === 'Withdraw' && (
            <div className="wallet-deposit">
              <div className="deposit-wallet_main">
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  marginBottom: '30px',
                }}>
                  <div className='deposit-cp'>
                    <p>Withdraw Currency</p>
                    <div className="deposit-address">
                      <span className="eg-address">
                        <span className="eAddress">eGold</span>
                      </span>
                    </div>
                  </div>
                  <div className='deposit-cp'>
                    <p>Account Id</p>
                    <div className="withdraw-address-box">
                      <input
                        className="withdraw-address_input"
                        type="text"
                        value={withdrawalAccount}
                        onChange={handleWithdrawalAccount}
                      />
                    </div>
                  </div>
                  <div className='deposit-cp'>
                    <div className="withdraw-amount_title">
                      <p>Withdraw Amount</p>
                      <p>MIN: 50 eGold</p>
                    </div>
                    <div className="withdraw-address-box">
                      <input
                        className="withdraw-address_input"
                        type="number"
                        value={withdrawalAmount}
                        onChange={handleWithdrawalChange}
                      />
                    </div>
                  </div>
                </div>
                <div>

                  <div className="withdraw_amounts">
                    <div className="withdraw_amount-details">
                      <span>Withdraw Amount:</span>
                      <span>{withdrawalAmount} eGold</span>
                    </div>
                    <div className="withdraw_amount-details">
                      <span className='flexed'>
                        Fee:
                        <img
                          className="more-info_icon"
                          src="./help-circle.svg"
                          alt=""
                        />
                      </span>
                      <span>0.00 eGold</span>
                    </div>
                    <div className="withdraw_amount-details">
                      <span>Total Withdraw Amount:</span>
                      <span>{withdrawalAmount} eGold</span>
                    </div>
                  </div>

                  <div className="crypto-notice">
                    <span className="crypto-notice_notice-head">NOTICE: </span>
                    <span className="crypto-notice_notice-info">
                      For security purposes, large or suspicious withdrawal may
                      take 1-3 hours for audit process. We appreciate your
                      patience!
                    </span>
                  </div>
                  <div className="deposit_fiat-btn">
                    <button onClick={initiateWithdrawal}>Withdraw</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentSection === 'Transaction' && (
            <div className="transaction-section">
              {/* <div className="transaction-filters">
                <select name="" id="">
                  <option value="deposit">Deposit</option>
                  <option value="withdraw">Withdraw</option>
                  <option value="withdraw">All Bets</option>
                </select>
                <select name="" id="">
                  <option value="">Past 60 days</option>
                  <option value="">Past 24 hours</option>
                  <option value="">Past 7 days</option>
                  <option value="">Past 30 days</option>
                  <option value="">Past 90 days</option>
                  <option value="">Custom</option>
                </select>
                <select name="" id="">
                  <option value="">All Status</option>
                  <option value="">Complete</option>
                  <option value="">Processing</option>
                  <option value="">Failed</option>
                  <option value="">Canceled</option>
                </select>
              </div> */}
              <div className="transaction-main_section">
                {
                  transactions.length === 0 && (
                    <>
                      <div className="no-transanction-img_container">
                        <img src="./_x31_.png" alt="no-transanction_image" />
                      </div>
                      <p className="no-data_txt">Oops! There is no data yet!</p>
                    </>
                  )
                }
                {
                  transactions.length > 0 && (
                    <Box className='tableHistory'>
                      <TableContainer>
                        <Table variant='simple'>
                          <Thead>
                            <Tr>
                              <Th>ID</Th>
                              <Th>Type</Th>
                              <Th>Currency</Th>
                              <Th>Amount</Th>
                              <Th>Time</Th>
                              <Th>Status</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {
                              transactions.map((transaction, index) => (
                                <Tr key={index}>
                                  <Td>{transaction.transactionId}</Td>
                                  <Td>{transaction.transactionType.toUpperCase()}</Td>
                                  <Td>eGold</Td>
                                  <Td>{transaction.amount}</Td>
                                  <Td>{moment(transaction.timestamp).fromNow()}</Td>
                                  <Td>Complete</Td>
                                </Tr>
                              ))
                            }
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Box>)
                }
              </div>
            </div>
          )}
          {currentSection === 'Earnings' && (
            <div>
              <div className="earnings-img_container">
                <img src="./game.png" alt="earnings_image" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;
