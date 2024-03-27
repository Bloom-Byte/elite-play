import React from 'react';
import './ChatPopup.css';

const ChatPopup = ({setChatOpen, chatOpen}) => {
  return (
    <div className="chatroom-popup">
      <div className="chatroom-popup-popup_container">
        <div className="chatroom-popup_header">
          <p>Chatroom</p>
          <div className="chatroom-btn">
            <img
              className="arrow"
              src="./arrow-shrink-01-round.svg"
              alt="arrow"
            />
            <img onClick={() => setChatOpen(!chatOpen)} className="close" src="./cancel-x.svg" alt="cancel-x.svg" />
          </div>
        </div>
        <div className="chatroom-maincontent">
          <div className="chatroom_languages">
            <div className="chatroom_language chatroom_language-active">
              <span>Global</span>
            </div>
            <div className="chatroom_language">
              <span>English</span>
            </div>
            <div className="chatroom_language">
              <span>Indonesia</span>
            </div>
            <div className="chatroom_language">
              <span>বাংল</span>
            </div>
            <div className="chatroom_language">
              <span>Руccкий</span>
            </div>
          </div>
          <div>
            <div className="chatroom-chatbox__container">
              <div className="chatroom-chatbox">
                <div className="chatroom-user-profile">
                  <span>Yuxeer</span>
                  <img src="./profile-img.svg" alt="profile-img" />
                </div>
                <div className="chatroom-chat-txt">
                  <span>
                    Anyone else playing the Crash right now? This is getting
                    intense!
                  </span>
                </div>
              </div>
              <div className="chatroom-chatbox">
                <div className="chatroom-user-profile">
                  <span>Yuxeer</span>
                  <img src="./profile-img.svg" alt="profile-img" />
                </div>
                <div className="chatroom-chat-txt">
                  <span>
                     Hey there! Just hopped in for a few rounds of Crash. What's
                    the payout looking like?
                  </span>
                </div>
              </div>
              <div className="chatroom-chatbox">
                <div className="chatroom-user-profile">
                  <span>Yuxeer</span>
                  <img src="./profile-img.svg" alt="profile-img" />
                </div>
                <div className="chatroom-chat-txt">
                  <span>
                     It's been climbing for a while now, gotta be close to the
                    x100 mark!
                  </span>
                </div>
              </div>
              <div className="chatroom-chatbox">
                <div className="chatroom-user-profile">
                  <span>Yuxeer</span>
                  <img src="./profile-img.svg" alt="profile-img" />
                </div>
                <div className="chatroom-chat-txt">
                  <span>
                    Hi everyone! Just getting started on Crash. Any tips for a
                    newbie?
                  </span>
                </div>
              </div>
              <div className="chatroom-chatbox">
                <div className="chatroom-user-profile">
                  <span>Yuxeer</span>
                  <img src="./profile-img.svg" alt="profile-img" />
                </div>
                <div className="chatroom-chat-txt">
                  <span>
                    Welcome <span className='user-tag'>@NewDice</span> Crash can be a rush, but be careful not to
                    chase the big payouts. Start slow and learn the curve.
                  </span>
                </div>
              </div>
              <div className="chatroom-chatbox">
                <div className="chatroom-user-profile">
                  <span>Yuxeer</span>
                  <img src="./profile-img.svg" alt="profile-img" />
                </div>
                <div className="chatroom-chat-txt">
                  <span>
                    Welcome <span className='user-tag'>@NewDice</span> Crash can be a rush, but be careful not to
                    chase the big payouts. Start slow and learn the curve.
                  </span>
                </div>
              </div>
              <div className="chatroom-chatbox">
                <div className="chatroom-user-profile">
                  <span>Yuxeer</span>
                  <img src="./profile-img.svg" alt="profile-img" />
                </div>
                <div className="chatroom-chat-txt">
                  <span>
                    Welcome <span className='user-tag'>@NewDice</span> Crash can be a rush, but be careful not to
                    chase the big payouts. Start slow and learn the curve.
                  </span>
                </div>
              </div>
            </div>
            <div className="chatroom-input">
                <div>
                  <input placeholder="Type here..." type="text" />
                </div>
                <button>
                  <img src="./Send.svg" alt="send-icon" />
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
