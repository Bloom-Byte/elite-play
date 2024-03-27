import React, { useState } from 'react';
import './LiveSupportPopup.css';

const LiveSupportPopup = ({ liveSupport, setLiveSupport }) => {
  const [currentTab, setCurrentTab] = useState(0);

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
                      setLiveSupport(!liveSupport);
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
              <div className="send-message_box">
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
                <div className="help-box">
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
                      setLiveSupport(!liveSupport);
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
                    <div className="message-body_button">
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
                  <p className="message-header">Messages</p>
                  <img
                    className="livesupport-cancel"
                    onClick={() => {
                      setLiveSupport(!liveSupport);
                    }}
                    src="./cancel-x.svg"
                    alt="cancel"
                  />
                </div>
                <div className='search__box'>
                  <img src="./Search.svg" alt="search-icon" />
                  <input type="text" placeholder="Search for help" />
                </div>
               <div className="help-collections">
                <h2>7 Collections</h2>
                <div className="user-guides">
                    <div className="user-guide">
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
                        <p>24 articles</p>
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
        </div>
      </div>
    </div>
  );
};

export default LiveSupportPopup;
