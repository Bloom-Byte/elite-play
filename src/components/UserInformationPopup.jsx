import React from 'react';
import StatPopup from './StatPopup';
import './UserInformationPopup.css';

const UserInformationPopup = ({
  setIsUserInformationPopupOpen,
  isUserInformationPopupOpen,
    isStatPopupOpen,
    setIsStatPopupOpen,
    user
}) => {
  return (
    <>
      <div className="userinfopopup">
        <div className="userinfopopup-content">
          <div className="userinfopopup-header">
            <p>User Information</p>
            <img
              onClick={() => {
                setIsUserInformationPopupOpen(!isUserInformationPopupOpen);
              }}
              src="./cancel-x.svg"
              alt="cancel-icon"
            />
          </div>
          <div className="userinfopopup-profile_info">
            <div className="userinfopopup-profile_info-edit">
              <img
                className="userinfo-pimg"
                src="./profile-img.svg"
                alt="image"
              />
              <p>{user? user.name : 'Yuxeer'}</p>
              <p>USER ID: {user? user._id : '12357308'}</p>
            </div>
            <img className="edit-icon" src="./Edit.svg" alt="edit-icon" />
          </div>
          <div className="statcards-container">
            <div className="statcards-nav">
              <span className="stat-stat-icon">
                <img src="./Statistics.svg" alt="statistics" /> Statistics
              </span>
              <span
                onClick={() => {
                  setIsStatPopupOpen(!isStatPopupOpen);
                }}
                className="stat-next-icon"
              >
                Details <img src="./Union-green.svg" alt="union-icon" />
              </span>
            </div>
            <div className="statcards">
              <div className="statcard">
                <p>Total Wins</p>
                <h5>3377</h5>
              </div>
              <div className="statcard">
                <p>Total Bets</p>
                <h5>4771</h5>
              </div>
              <div className="statcard">
                <p>Total Wagered</p>
                <h5>18,1...</h5>
              </div>
            </div>
          </div>
          <div className="fav-game">
            <p className="game-head-txt">Favorite Game</p>
            <hr />
            <div className="fav-info">
              <div className="fav-game-type">
                <img src="./dice-win.svg" alt="dice" />
                <span>DICE</span>
              </div>
              <div className="fav-game-amount">
                <p>Wagered</p>
                <p>USD 18,149.23</p>
              </div>
            </div>
          </div>
          <p className="join-txt">Joined on 4/11/2023</p>
        </div>
      </div>
      {isStatPopupOpen && <StatPopup isStatPopupOpen={isStatPopupOpen} setIsStatPopupOpen={setIsStatPopupOpen} />}
    </>
  );
};

export default UserInformationPopup;
