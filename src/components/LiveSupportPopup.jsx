import React, { useState, useEffect } from 'react';
import './LiveSupportPopup.css';
import instance from '../utils/api';

const LiveSupportPopup = ({ onCloseLive }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [tickets, setTickets] = useState('');
  const [userSupportInfo, setUserSupportInfo] = useState(null);

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const createSupportTicket = async () => {
    if (!details) {
      setError('Support ticket details are required');
      return;
    }

    const url = '/support';

    const payload = {
      details: details,
    };

    try {
      const response = await instance.post(url, payload);

      if (response.status !== 201) {
        throw new Error('Failed to create support ticket');
      }

      const responseData = response.data;
      console.log('New support ticket created:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  useEffect(() => {
    const fetchUserSupportInfo = async () => {
      try {
        const response = await instance.get('/support/user/all');

        if (response.status === 200) {
          throw new Error('Failed to fetch user support information');
        }

        const data = response.data;
        console.log(data)
        setUserSupportInfo(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserSupportInfo();
  }, []);


  return (
    <div className="live-support">
      <div className="live-suppport_content">
        <div>
          {currentTab === 0 && (
            <div>
              <div className="live-support_hero">
                <div className="live-support_top-icons">
                  <img
                    src="./live-support_images.png"
                    alt="live-support-icon"
                  />
                  <img
                    className="livesupport-cancel"
                    onClick={() => {
                      onCloseLive();
                    }}
                    src="./cancel-x.svg"
                    alt="cancel"
                  />
                </div>
                <h1>
                  Hy🎄
                  <br /> How can we help?
                </h1>
              </div>
              <div
                onClick={() => {
                  setCurrentTab(4);
                }}
                className="send-message_box"
              >
                <div>
                  <h5>Send us a message</h5>
                  <p>We typically reply in under 2 minutes</p>
                </div>
                <img src="./send-black.svg" alt="send-icon" />
              </div>
              <div className="search-for-help_box">
                <div className="search__input">
                  <img src="./Search.svg" alt="search-icon" />
                  <input type="text" placeholder="Search for help" />
                </div>
                <div
                  onClick={() => {
                    setCurrentTab(3);
                  }}
                  className="help-box"
                >
                  <span>How to Deposit?</span>
                  <img src="./Union.svg" alt="arrow-icon" />
                </div>
                <div className="help-box">
                  <span>How to Withdraw?</span>
                  <img src="./Union.svg" alt="arrow-icon" />
                </div>
                <div className="help-box">
                  <span>What promotions are you available to try?</span>
                  <img src="./Union.svg" alt="arrow-icon" />
                </div>
                <div className="help-box">
                  <span>How can I verify the result of Dice?</span>
                  <img src="./Union.svg" alt="arrow-icon" />
                </div>
              </div>
              <div className="help-center__navs">
                <div
                  onClick={() => {
                    setCurrentTab(0);
                  }}
                  className={`help-center__nav ${
                    currentTab == 0 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={currentTab == 0 ? './Home-active.svg' : './Home.svg'}
                    alt="home-icon"
                  />
                  <span>Home</span>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab(1);
                  }}
                  className={`help-center__nav ${
                    currentTab == 1 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={
                      currentTab == 1 ? './Message-active.svg' : './Message.svg'
                    }
                    alt="message-icon"
                  />
                  <span>Message</span>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab(2);
                  }}
                  className={`help-center__nav ${
                    currentTab == 2 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={currentTab == 2 ? './Help-active.svg' : './Help.svg'}
                    alt="help-icon"
                  />
                  <span>Help</span>
                </div>
              </div>
            </div>
          )}
          {currentTab === 1 && (
            <div>
              <div className="live-support_message">
                <div className="live-support_icons_2">
                  <p className="message-header">Messages</p>
                  <img
                    className="livesupport-cancel"
                    onClick={() => {
                      onCloseLive();
                    }}
                    src="./cancel-x.svg"
                    alt="cancel"
                  />
                </div>
                <div className="message-body">
                  <div className="message-body_content">
                    <div className="message-body_text">
                      <img src="./Message-active.svg" alt="message-icon" />
                      <h5>No messages</h5>
                      <p>Messages from the team will be shown here</p>
                    </div>
                    <div
                      onClick={() => {
                        setCurrentTab(4);
                      }}
                      className="message-body_button"
                    >
                      <button>
                        <span>Send us a message</span>
                        <img src="./Send.svg" alt="send-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="help-center__navs">
                <div
                  onClick={() => {
                    setCurrentTab(0);
                  }}
                  className={`help-center__nav ${
                    currentTab == 0 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={currentTab == 0 ? './Home-active.svg' : './Home.svg'}
                    alt="home-icon"
                  />
                  <span>Home</span>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab(1);
                  }}
                  className={`help-center__nav ${
                    currentTab == 1 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={
                      currentTab == 1 ? './Message-active.svg' : './Message.svg'
                    }
                    alt="message-icon"
                  />
                  <span>Message</span>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab(2);
                  }}
                  className={`help-center__nav ${
                    currentTab == 2 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={currentTab == 2 ? './Help-active.svg' : './Help.svg'}
                    alt="help-icon"
                  />
                  <span>Help</span>
                </div>
              </div>
            </div>
          )}
          {currentTab === 2 && (
            <div>
              <div className="live-support_message">
                <div className="live-support_icons_2 help-header">
                  <p style={{ textAlign: 'center' }} className="message-header">
                    Help
                  </p>
                  <img
                    className="livesupport-cancel"
                    onClick={() => {
                      onCloseLive();
                    }}
                    src="./cancel-x.svg"
                    alt="cancel"
                  />
                </div>
                <div className="search__box">
                  <img src="./Search.svg" alt="search-icon" />
                  <input type="text" placeholder="Search for help" />
                </div>
                <div className="help-collections">
                  <h2>7 Collections</h2>
                  <div className="user-guides">
                    <div
                      onClick={() => {
                        setCurrentTab(5);
                      }}
                      className="user-guide"
                    >
                      <div>
                        <h5>New User Guide</h5>
                        <p>24 articles</p>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                    <div className="user-guide">
                      <div>
                        <h5>New User Guide</h5>
                        <p>How to Deposit?</p>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                    <div className="user-guide">
                      <div>
                        <h5>New User Guide</h5>
                        <p>How to Deposit?</p>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                    <div className="user-guide">
                      <div>
                        <h5>New User Guide</h5>
                        <p>How to Deposit?</p>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                    <div className="user-guide">
                      <div>
                        <h5>New User Guide</h5>
                        <p>How to Deposit?</p>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                    <div className="user-guide">
                      <div>
                        <h5>New User Guide</h5>
                        <p>How to Deposit?</p>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="help-center__navs">
                <div
                  onClick={() => {
                    setCurrentTab(0);
                  }}
                  className={`help-center__nav ${
                    currentTab == 0 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={currentTab == 0 ? './Home-active.svg' : './Home.svg'}
                    alt="home-icon"
                  />
                  <span>Home</span>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab(1);
                  }}
                  className={`help-center__nav ${
                    currentTab == 1 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={
                      currentTab == 1 ? './Message-active.svg' : './Message.svg'
                    }
                    alt="message-icon"
                  />
                  <span>Message</span>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab(2);
                  }}
                  className={`help-center__nav ${
                    currentTab == 2 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={currentTab == 2 ? './Help-active.svg' : './Help.svg'}
                    alt="help-icon"
                  />
                  <span>Help</span>
                </div>
              </div>
            </div>
          )}
          {currentTab === 3 && (
            <div>
              <div className="live-support_message">
                <div className="help-center_blog-icons">
                  <img
                    className="arrow-back"
                    onClick={() => {
                      setCurrentTab(0);
                    }}
                    src="./arrow-left.svg"
                    alt="arrow-icon"
                  />
                  <div className="help-center_blog-icon-ce">
                    <img
                      src="./arrow-shrink-01-round-black.svg"
                      alt="arrow-icon"
                    />
                    <img
                      className="livesupport-cancel"
                      onClick={() => {
                        onCloseLive();
                      }}
                      src="./cancel-black.svg"
                      alt="cancel"
                    />
                  </div>
                </div>
                <div className="help-center_blog-info">
                  <h1>How to Deposit</h1>
                  <p>Deposit Bitcoin, Ethereum or any other cryptocurrency!</p>
                  <div className="writer-info">
                    <img src="./writer.png" alt="writer-icon" />
                    <div className="writer-info-txt">
                      <p>Written by Jenny</p>
                      <p>Updated over a week ago</p>
                    </div>
                  </div>
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
                  <div className="blog-survey">
                    <p>Did this answer your question?</p>
                    <div>
                      <span>😞</span>
                      <span>😐</span>
                      <span>😃</span>
                    </div>
                    <select name="language" id="language">
                      <option value="english">English</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentTab === 4 && (
            <div>
              <div className="live-support_message">
                <div className="live-support_icons_2">
                  <img
                    className="back-home"
                    onClick={() => {
                      setCurrentTab(0);
                    }}
                    src="./chevron-left.svg"
                    alt="arrow-left"
                  />
                  <p className="message-header">Eliteplay</p>
                  <img
                    className="livesupport-cancel"
                    onClick={() => {
                      onCloseLive();
                    }}
                    src="./cancel-x.svg"
                    alt="cancel"
                  />
                </div>

                <div className="chat_section-support">
                  <img
                    src="./live-support_images.png"
                    alt="live-support-icon"
                  />
                  <h5 className="reply-fast">
                    We typically reply under 2 minutes
                  </h5>
                  <p className="help-you">How can we help you? ❤️</p>
                </div>
                <div className="chat-contents">
                  {error && <p className="error-msg">{error}</p>}
                </div>
                <div className="chat-support-send">
                  <input
                    type="text"
                    placeholder="Type here..."
                    value={details}
                    onChange={handleDetailsChange}
                  />
                  <img src="./emoji-happy.svg" alt="emoji-icon" />
                  <img
                    className="attach-icon"
                    src="./attchment.svg"
                    alt="emoji-icon"
                  />
                  <button className="chat-support-send-btn">
                    <img src="./Send.svg" alt="" />
                  </button>
                </div>
              </div>
              <div className="helpcenter-service-input"></div>
            </div>
          )}
          {currentTab === 5 && (
            <div>
              <div className="live-support_message">
                <div className="live-support_icons_2 help-header">
                  <p style={{ textAlign: 'center' }} className="message-header">
                    Help
                  </p>
                  <img
                    className="livesupport-cancel"
                    onClick={() => {
                      onCloseLive();
                    }}
                    src="./cancel-x.svg"
                    alt="cancel"
                  />
                </div>
                <div className="search__box">
                  <img src="./Search.svg" alt="search-icon" />
                  <input type="text" placeholder="Search for help" />
                </div>
                <div className="help-collections">
                  <div className="bulk-article">
                    <div className="bulk-article-txt">
                      <h2>New User Guide</h2>
                      <p>24 articles</p>
                      <p>By Karmen and 2 others</p>
                    </div>
                    <div className="bulk-article-img">
                      <img
                        src="./live-support_images.png"
                        alt="live-support-icon"
                      />
                    </div>
                  </div>

                  <div className="user-guides">
                    <div
                      onClick={() => {
                        setCurrentTab(6);
                      }}
                      className="user-guide"
                    >
                      <div>
                        <h5>ETH DEPOSIT</h5>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                    <div className="user-guide">
                      <div>
                        <h5>ETH DEPOSIT</h5>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                    <div className="user-guide">
                      <div>
                        <h5>ETH DEPOSIT</h5>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                    <div className="user-guide">
                      <div>
                        <h5>ETH DEPOSIT</h5>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                    <div className="user-guide">
                      <div>
                        <h5>ETH DEPOSIT</h5>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                    <div className="user-guide">
                      <div>
                        <h5>ETH DEPOSIT</h5>
                      </div>
                      <div>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="help-center__navs">
                <div
                  onClick={() => {
                    setCurrentTab(0);
                  }}
                  className={`help-center__nav ${
                    currentTab == 0 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={currentTab == 0 ? './Home-active.svg' : './Home.svg'}
                    alt="home-icon"
                  />
                  <span>Home</span>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab(1);
                  }}
                  className={`help-center__nav ${
                    currentTab == 1 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={
                      currentTab == 1 ? './Message-active.svg' : './Message.svg'
                    }
                    alt="message-icon"
                  />
                  <span>Message</span>
                </div>
                <div
                  onClick={() => {
                    setCurrentTab(2);
                  }}
                  className={`help-center__nav ${
                    currentTab == 2 ? 'help-center__nav-active' : ''
                  }`}
                >
                  <img
                    src={currentTab == 2 ? './Help-active.svg' : './Help.svg'}
                    alt="help-icon"
                  />
                  <span>Help</span>
                </div>
              </div>
            </div>
          )}
          {currentTab === 6 && (
            <div>
              <div className="live-support_message">
                <div className="help-center_blog-icons">
                  <img
                    className="arrow-back"
                    onClick={() => {
                      setCurrentTab(0);
                    }}
                    src="./arrow-left.svg"
                    alt="arrow-icon"
                  />
                  <div className="help-center_blog-icon-ce">
                    <img
                      src="./arrow-shrink-01-round-black.svg"
                      alt="arrow-icon"
                    />
                    <img
                      className="livesupport-cancel"
                      onClick={() => {
                        onCloseLive();
                      }}
                      src="./cancel-black.svg"
                      alt="cancel"
                    />
                  </div>
                </div>
                <div className="help-center_blog-info">
                  <h1>ETH Deposit</h1>
                  <p>Made a ETH deposit, but it didn&apos;t credit</p>
                  <div className="writer-info">
                    <img src="./writer.png" alt="writer-icon" />
                    <div className="writer-info-txt">
                      <p>Written by Jenny</p>
                      <p>Updated over a week ago</p>
                    </div>
                  </div>
                  <div>
                    <p>
                      The ETH Transaction ID/HASH must be “SUCCESS” and you
                      should see a green checkmark like this on the blockchain:
                    </p>
                    <div className="img-box"></div>
                    <p>
                      The hourglass means that it hasn’t been confirmed by the
                      blockchain yet.
                    </p>
                    <div className="img-box"></div>
                    <p>
                      If you didn’t get credited it, the ETH/ERC20 deposit you
                      made is through a smart contract, which our system does
                      not support automatically. But, you don’t need to worry
                      about it, you just need to reach our customer support team
                      and provide them the transaction id and they will solve it
                      manually immediately!
                    </p>
                    <div className="img-box"></div>
                  </div>
                  <div className="blog-survey">
                    <p>Did this answer your question?</p>
                    <div>
                      <span>😞</span>
                      <span>😐</span>
                      <span>😃</span>
                    </div>
                    <select name="language" id="language">
                      <option value="english">English</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSupportPopup;
