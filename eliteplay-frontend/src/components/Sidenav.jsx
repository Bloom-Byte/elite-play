import React, { useState } from 'react'
import './Sidenav.css'

const Sidenav = ({ isNavOpen, setIsNavOpen }) => {

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
            <img src="./eliteplay.svg" alt="logo" />
          </div>
          <div className="sidenav__links">
            <div className="sidenav__link">
              <img src="./gift.svg" alt="reward-icon" />
              <span>Rewards</span>
            </div>
            <div className="sidenav__link">
              <img src="./dice.svg" alt="dice-icon" />
              <span>Dice</span>
            </div>
            <div className="sidenav__link">
              <img src="./chart-increase.svg" alt="crash-icon" />
              <span>Crash</span>
            </div>
            <div className="sidenav__link">
              <img src="./message-01.svg" alt="chat-icon" />
              <span>Chatroom</span>
            </div>
            <div className="sidenav__link">
              <img src="./VIP.svg" alt="vip-icon" />
              <span>
                <span className="sidenav-vip">VIP</span> Club
              </span>
            </div>
            <div className="sidenav__link">
              <img src="./customer-support.svg" alt="support-icon" />
              <span>Live Support</span>
            </div>
            <div className="sidenav__link">
              <img src="./translate.svg" alt="translate-icon" />
              <span>Language: English</span>
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
