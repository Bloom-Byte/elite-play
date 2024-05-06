import React, { useState, useEffect, useRef, useCallback } from 'react';
import SocketIO from 'socket.io-client';
import { isLoggedIn } from '../utils/auth';

const accessToken = localStorage.getItem('accessToken');
const socket = SocketIO('https://be.eliteplay.bloombyte.dev/chat', {
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
  const [loadMessagesError, setLoadMessagesError] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const userIsLoggedIn = isLoggedIn();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        setIsLoadingSavedMessages(false);
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
    const message = {
      message: trimmedMessage,
    };
    // send a message to the server
    socket.emit('chat', message);
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

  const sendMessage = (event) => {
    event.preventDefault();
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
    <div className={`chatroom-popup ${chatOpen ? 'open' : ''}`}>
      <div className="chatroom-popup-popup_container">
        <div className="chatroom-popup_header">
          <p>Chatroom</p>
          <div
            className={`chatroom-btn ${isMobile ? '' : 'hide-cancel-button'}`}
          >
            <img
              onClick={() => setChatOpen(!chatOpen)}
              className="close"
              src="./cancel-x.svg"
              alt="cancel-x.svg"
            />
          </div>
        </div>
        <div className="chatroom-maincontent">
          {/* <div className="chatroom_languages">
            <div className="chatroom_language chatroom_language-active">
              <span>Global</span>
              <img src="./Exclude.svg" alt="live-icon" />
            </div>
          </div> */}
          <div>
            <div
              className={`chatroom-chatbox__container ${
                minimized ? 'minimized' : ''
              }`}
            >
              {isLoadingSavedMessages && (
                <h3 className="chatmsg-error">Loading saved messages...</h3>
              )}
              {loadMessagesError && (
                <h3 className="chatmsg-error">
                  Error loading messages: {loadMessagesError}
                </h3>
              )}

              {messages.map((msg, index) => (
                <div key={index} className="chatroom-chatbox">
                  <div className="chatroom-user-profile">
                    <span>{msg.username}</span>
                    <img
                      src={
                        msg.profilePictureUrl || './placeholder-profile-img.jpg'
                      }
                      alt="profile-img"
                    />
                  </div>
                  <div className="chatroom-chat-txt">
                    <span>{msg.message}</span>
                  </div>
                </div>
              ))}
            </div>
            {userIsLoggedIn ? (
              <div>
                <form className="chatroom-input" onSubmit={sendMessage}>
                  <div style={{ width: '100%' }}>
                    <input
                      placeholder="Type here..."
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleSendMessage}
                    />
                  </div>
                  <button type="submit">
                    <img src="./Send.svg" alt="send-icon" />
                  </button>
                </form>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
