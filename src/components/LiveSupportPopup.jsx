import { useState, useEffect, useCallback, useRef } from 'react';
import './LiveSupportPopup.css';
import instance from '../utils/api';
import { Divider, IconButton, useToast } from '@chakra-ui/react';
import { LuSendHorizonal } from "react-icons/lu";
import { BsSendPlus } from "react-icons/bs";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import moment from 'moment/moment';
import { blogs } from './blogs/blogs';

const LiveSupportPopup = ({ onCloseLive }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [details, setDetails] = useState('');
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [chatContents, setChatContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [blogIndex, setBlogIndex] = useState(0);
  const [search, setSearch] = useState('');

  const pollInterval = 15000;

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setDetails(details + emoji);
    setShowEmojis(false);
  };

  const toast = useToast();

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
    setShowEmojis(false);
  };

  const fetchChatContents = useCallback(async () => {
    if (!currentTicket) {
      return;
    }

    const url = `/support/${currentTicket}`;
    const response = await instance.get(url);

    if (response.status !== 200) {
      toast({
        title: 'Error fetching chat contents',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setChatContents(response.data.messages);
  }, [currentTicket, toast]);

  const createSupportTicket = async () => {
    if (!details) {
      toast({
        title: 'Support ticket details are required',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const url = '/support';

    const payload = {
      details: details,
    };

    try {
      setIsLoading(true);
      const response = await instance.post(url, payload);
      setIsLoading(false);

      if (response.status !== 201) {
        throw new Error('Failed to create support ticket');
      }

      toast({
        title: 'Support ticket created successfully, now you can send a message',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setDetails('');

      setCurrentTicket(response.data.ticketId);
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
    }
  };

  const sendMessage = async () => {
    if (!details) {
      toast({
        title: 'Message details are required',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const url = `/support/${currentTicket}/messages`;
    const data = {
      message: details,
    }
    setIsLoading(true);
    const response = await instance.post(url, data);
    setIsLoading(false);
    if (response.status !== 201) {
      toast({
        title: 'Error sending message, try again later',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    fetchChatContents();
    setDetails('');
    scrollToBottom();
  };

  const fetchTickets = async () => {
    try {
      const response = await instance.get('/support/user/all');

      if (response.status !== 200) {
        toast({
          title: 'Error fetching user support tickets',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }

      const data = response.data;
      setTickets(data.data);
    } catch (error) {
      toast({
        title: 'Error fetching user support tickets',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (currentTicket) {
      fetchChatContents();
    }

    // Fetch chat contents every X seconds
    const interval = setInterval(() => {
      fetchChatContents();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [currentTicket, fetchChatContents]);

  const maxWidthMap = {
    0: '470px',
    1: '450px',
    2: '400px',
    3: '600px',
    4: '500px',
    5: '400px',
    6: '400px',
  };

  const chatContentsRef = useRef(null);

  const scrollToBottom = (time = 100) => {
    if (!chatContentsRef.current) return;
    setTimeout(() => {
      chatContentsRef.current.scrollTop = chatContentsRef.current.scrollHeight;
    }, time);
  };

  const Footer = () => {
    return (
      <div className="help-center__navs">
        <div
          onClick={() => {
            setCurrentTab(0);
          }}
          className={`help-center__nav ${currentTab == 0 ? 'help-center__nav-active' : ''
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
            fetchTickets();
          }}
          className={`help-center__nav ${currentTab == 1 ? 'help-center__nav-active' : ''
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
          className={`help-center__nav ${currentTab == 2 ? 'help-center__nav-active' : ''
            }`}
          style={{
            display: 'none'
          }}
        >
          <img
            src={currentTab == 2 ? './Help-active.svg' : './Help.svg'}
            alt="help-icon"
          />
          <span>Help</span>
        </div>
      </div>
    )
  }

  return (
    <div className="live-support">
      <div className="live-suppport_content" style={{
        maxWidth: maxWidthMap[currentTab],
      }}>
        <div>
          {currentTab === 0 && (
            <div>
              <div className="live-support_hero one">
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
              </div>
              <div style={{
                overflowY: 'scroll',
                maxHeight: '450px',
              }}>
                <div className="live-support_hero two">
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
                    <input type="text" placeholder="Search for help" value={search} onChange={(e) => {
                      setSearch(e.target.value);
                    }} />
                  </div>
                  {
                    blogs
                    .filter(
                      (blog) =>
                        blog.title.toLowerCase().includes(search.toLowerCase()) ||
                        blog.subtitle.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((blog, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setBlogIndex(index);
                          setCurrentTab(3);
                        }}
                        className="help-box"
                      >
                        <span>{blog.title}</span>
                        <img src="./Union.svg" alt="arrow-icon" />
                      </div>
                    ))
                  }
                </div>
              </div>
              <Footer />
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
                    {
                      tickets.length === 0 && (
                        <div className="message-body_text">
                          <img src="./Message-active.svg" alt="message-icon" />
                          <h5>No messages</h5>
                          <p>Messages from the team will be shown here</p>
                        </div>
                      )
                    }
                    {
                      tickets.length > 0 && (
                        <div className='ticket-items'>
                          {
                            tickets.map((ticket, index) => (
                              <div key={index} >
                                <div key={index} className='ticket-item' onClick={() => {
                                  setCurrentTicket(ticket._id);
                                  setCurrentTab(4);
                                }}>
                                  <h5>{ticket.details}</h5>
                                  <p>{moment(ticket.createdAt).fromNow()}</p>
                                </div>
                                <Divider bg={'#101018'} />
                              </div>
                            ))
                          }
                        </div>)}
                    <button
                      onClick={() => {
                        setCurrentTab(4);
                      }}
                      className="message-body_button">
                      <span>Send us a message</span>
                      <img src="./Send.svg" alt="send-icon" />
                    </button>
                  </div>
                </div>
              </div>
              <Footer />
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
              <Footer />
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
                  <h1>{blogs[blogIndex].title}</h1>
                  <p style={{
                    marginBottom: '20px',
                  }}>{blogs[blogIndex].subtitle}</p>
                  {blogs[blogIndex].content}
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
                      setCurrentTab(1);
                      fetchTickets();
                      setCurrentTicket(null);
                      setChatContents([]);
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
                    src="./support-group.png"
                    alt="live-support-icon"
                    width={'45%'}
                  />
                  <h5 className="reply-fast">
                    We typically reply under 2 minutes
                  </h5>
                  <p className="help-you">How can we help you? ❤️</p>
                </div>
                <div className="chat-contents" ref={chatContentsRef}>
                  {
                    chatContents.map((chat, index) => (
                      <div key={index} className={`chat-content ${chat.sender === 'representative' ? 'chat-support' : 'chat-user'}`}>
                        <p>{chat.message}</p>
                        <span>{moment(chat.timestamp).fromNow()}</span>
                      </div>
                    ))
                  }
                  {
                    chatContents.length === 0 && currentTicket && (
                      <div className="chat-content chat-support">
                        <p>Hi there! How can we help you today?</p>
                        <span>{moment().fromNow()}</span>
                      </div>
                    )
                  }
                </div>
                <div style={{
                  position: 'relative'
                }}>
                  {showEmojis && (
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bottom: '0',
                    }}>
                      <Picker onEmojiSelect={addEmoji} data={data} />
                    </div>
                  )}
                </div>
                <div className="chat-support-send">
                  <input
                    type="text"
                    placeholder={currentTicket ? 'Type here ...' : 'Write the subject of your message here ...'}
                    value={details}
                    onChange={handleDetailsChange}
                    onClick={() => setShowEmojis(false)}
                  />
                  <img src="./emoji-happy.svg" alt="emoji-icon" onClick={() => setShowEmojis(!showEmojis)} />
                  <IconButton
                    icon={currentTicket ? <LuSendHorizonal /> : <BsSendPlus />}
                    className="chat-support-send-btn"
                    onClick={() => {
                      if (currentTicket) {
                        sendMessage();
                      } else {
                        createSupportTicket();
                      }
                    }}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  />
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
              <Footer />
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
