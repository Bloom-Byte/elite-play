import React, { useState } from 'react'
import './Sidenav.css'

const Sidenav = ({ isNavOpen, setIsNavOpen }) => {
  const [clickedItems, setClickedItems] = useState(Array(7).fill(false))

  const handleClick = (index) => {
    const updatedClickedItems = clickedItems.map((item, i) =>
      i === index ? true : false
    )
    setClickedItems(updatedClickedItems)
  }

  return (
    <>
      {isNavOpen ? (
        <div className="sidenav-expanded">
          <div className="sidenav__icon">
            <img
              className="nav-icon"
              onClick={() => setIsNavOpen(false)}
              src="./menu-01.svg"
              alt="close-icon"
            />
           <a href='/'> <img src="./eliteplay.svg" alt="logo" /></a>
          </div>
          <div className="sidenav__links">
            <div
              onClick={() => handleClick(0)}
              style={{
                backgroundColor: clickedItems[0] ? '#0B281F' : 'transparent',
                padding: clickedItems[0] ? '10px' : '0',
                borderRadius: clickedItems[0] ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div className="sidenav__link">
                <img src="./gift.svg" alt="reward-icon" />
                <span>Rewards</span>
              </div>
            </div>
            <div
              onClick={() => handleClick(1)}
              style={{
                backgroundColor: clickedItems[1] ? '#0B281F' : 'transparent',
                padding: clickedItems[1] ? '10px' : '0',
                borderRadius: clickedItems[1] ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div className="sidenav__link">
                <img src="./dice.svg" alt="dice-icon" />
                <span>Dice</span>
              </div>
            </div>
            <div
              onClick={() => handleClick(2)}
              style={{
                backgroundColor: clickedItems[2] ? '#0B281F' : 'transparent',
                padding: clickedItems[2] ? '10px' : '0',
                borderRadius: clickedItems[2] ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div className="sidenav__link">
                <img src="./chart-increase.svg" alt="crash-icon" />
                <span>Crash</span>
              </div>
            </div>
            <div
              onClick={() => handleClick(3)}
              style={{
                backgroundColor: clickedItems[3] ? '#0B281F' : 'transparent',
                padding: clickedItems[3] ? '10px' : '0',
                borderRadius: clickedItems[3] ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div className="sidenav__link">
                <img src="./message-01.svg" alt="chat-icon" />
                <span>Chatroom</span>
              </div>
            </div>
            <div
              onClick={() => handleClick(4)}
              style={{
                backgroundColor: clickedItems[4] ? '#0B281F' : 'transparent',
                padding: clickedItems[4] ? '10px' : '0',
                borderRadius: clickedItems[4] ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div className="sidenav__link">
                <img src="./VIP.svg" alt="vip-icon" />
                <span>
                  <span className="sidenav-vip">VIP</span> Club
                </span>
              </div>
            </div>
            <div
              onClick={() => handleClick(5)}
              style={{
                backgroundColor: clickedItems[5] ? '#0B281F' : 'transparent',
                padding: clickedItems[5] ? '10px' : '0',
                borderRadius: clickedItems[5] ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div className="sidenav__link">
                <img src="./customer-support.svg" alt="support-icon" />
                <span>Live Support</span>
              </div>
            </div>
            <div
              onClick={() => handleClick(6)}
              style={{
                backgroundColor: clickedItems[6] ? '#0B281F' : 'transparent',
                padding: clickedItems[6] ? '10px' : '0',
                borderRadius: clickedItems[6] ? '9px' : '0',
                transition: 'background-color 0.3s, padding 0.3s',
              }}
            >
              <div className="sidenav__link">
                <img src="./translate.svg" alt="translate-icon" />
                <span>Language: English</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sidenav-mini">
          <div className="sidenav__icon">
            <img
              className="nav-icon"
              src="./menu-01.svg"
              alt="menu-icon"
              onClick={() => setIsNavOpen(true)}
            />
          </div>
          <div className="sidenav__links">
            <div className="sidenav__link-mini">
              <img src="./gift.svg" alt="reward-icon" />
            </div>
            <div className="sidenav__link-mini">
              <img src="./dice.svg" alt="dice-icon" />
            </div>
            <div className="sidenav__link-mini">
              <img src="./chart-increase.svg" alt="crash-icon" />
            </div>
            <div className="sidenav__link-mini">
              <img src="./message-01.svg" alt="chat-icon" />
            </div>
            <div className="sidenav__link-mini">
              <img src="./VIP.svg" alt="vip-icon" />
            </div>
            <div className="sidenav__link-mini">
              <img src="./customer-support.svg" alt="support-icon" />
            </div>
            <div className="sidenav__link-mini">
              <img src="./translate.svg" alt="translate-icon" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidenav
