import React, { useState, useEffect, useRef, useCallback } from 'react';
import SocketIO from 'socket.io-client';

const accessToken = localStorage.getItem('accessToken');
const socket = SocketIO('http://localhost:3000', {
  transports: ['websocket'],
  autoConnect: true,
  query: {
    bearerToken: accessToken,
  },
});

import './ChatPopup.css';

const ChatPopup = ({ setChatOpen, chatOpen }) => {
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  //   const [hasFetchedSavedMessages, setHasFetchedSavedMessages] = useState(false);
  const [isLoadingSavedMessages, setIsLoadingSavedMessages] = useState(false);
  const hasFetchedSavedMessages = useRef(false);
  const [loadMessagesError, setLoadMessagesError] = useState('null');

  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    {
      socket.connect(); // connect to socket

      socket.on('connect', () => {
        // fire when we have connection
        console.log('Socket connected');
      });

      socket.on('disconnect', () => {
        // fire when socked is disconnected
        console.log('Socket disconnected');
      });

      socket.on('connect_error', (error) => {
        console.log('Connection Error', error);
      });
      socket.on('customError', (error) => {
        console.log('Custom Error', error);
      });
      socket.on('error', (error) => {
        console.log('Error', error);
      });

      // listen chat event messages
      socket.on('chat', (newMessage) => {
        console.log('New message added', newMessage);
        setMessages((previousMessages) => [...previousMessages, newMessage]);
      });

      socket.on('allMessages', (savedMessages) => {
        if (Array.isArray(savedMessages)) {
          setMessages(savedMessages);
        } else {
          console.error('Received non-array messages:', savedMessages);
        }
      });

      socket.on('newMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // fetch saved messages
      //   if (!hasFetchedSavedMessages.current) {
      //     setIsLoadingSavedMessages(true);
      //     socket.emit(
      //       "allMessages",
      //       (error: string, savedMessages: Message[]) => {
      //         if (error) {
      //           setLoadMessagesError("error loading messages: ${error}");
      //         } else {
      //           setMessages(savedMessages);
      //           hasFetchedSavedMessages.current = true;
      //         }
      //         setIsLoadingSavedMessages(false);
      //       }
      //     );
      if (!hasFetchedSavedMessages.current) {
        setIsLoadingSavedMessages(true);
        socket.emit('getAllMessages');
      }
    }
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
      socket.off('newMessage');
    };
  }, []);

  const handleSendMessage = (e) => {
    if (e.key !== 'Enter' || inputMessage.trim().length === 0) return;

    // send a message to the server
    socket.emit('chat', inputMessage);
    setInputMessage('');
  };
  // const sendMessage = () => {
  //   if (inputMessage.trim() !== '') {
  //     const message = {
  //       message: inputMessage.trim(),
  //     };
  //     socket.emit('chat', message);
  //     setInputMessage('');
  //   }
  // };

  const sendMessage = () => {
    const trimmedMessage = inputMessage.trim();
    if (trimmedMessage !== '') {
      const message = {
        message: trimmedMessage,
      };
      socket.emit('chat', message);
      setInputMessage('');
    }
  };

  return (
    <div className="chatroom-popup">
      <div className="chatroom-popup-popup_container">
        <div className="chatroom-popup_header">
          <p>Chatroom</p>
          <div className="chatroom-btn">
            <img
              onClick={() => setMinimized(!minimized)}
              className="arrow"
              src={
                minimized
                  ? './arrow-expand-01-round.svg'
                  : './arrow-shrink-01-round.svg'
              }
              alt="arrow"
            />
            <img
              onClick={() => setChatOpen(!chatOpen)}
              className="close"
              src="./cancel-x.svg"
              alt="cancel-x.svg"
            />
          </div>
        </div>
        <div className="chatroom-maincontent">
          <div className="chatroom_languages">
            <div className="chatroom_language chatroom_language-active">
              <span>Global</span>
              <img src="./Exclude.svg" alt="live-icon" />
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
            <div
              className={`chatroom-chatbox__container ${
                minimized ? 'minimized' : ''
              }`}
            >
              {isLoadingSavedMessages && <h3 className='chatmsg-error'>Loading saved messages...</h3>}
              {loadMessagesError && (
                <h3 className='chatmsg-error'>Error loading messages: {loadMessagesError}</h3>
              )}

              {messages.map((msg, index) => (
                <div key={index} className="chatroom-chatbox">
                  <div className="chatroom-user-profile">
                    <span>{msg.username}</span>
                    <img src={msg.profileUrl} alt="profile-img" />
                  </div>
                  <div className="chatroom-chat-txt">
                    <span>{msg.message}</span>
                  </div>
                </div>
              ))}
              {/* <div className="chatroom-chatbox">
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
                    Welcome <span className="user-tag">@NewDice</span> Crash can
                    be a rush, but be careful not to chase the big payouts.
                    Start slow and learn the curve.
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
                    Welcome <span className="user-tag">@NewDice</span> Crash can
                    be a rush, but be careful not to chase the big payouts.
                    Start slow and learn the curve.
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
                    Welcome <span className="user-tag">@NewDice</span> Crash can
                    be a rush, but be careful not to chase the big payouts.
                    Start slow and learn the curve.
                  </span>
                </div>
              </div> */}
            </div>
            <div className="chatroom-input">
              <div>
                <input
                  placeholder="Type here..."
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleSendMessage}
                />
              </div>
              <button onClick={sendMessage}>
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
