import { useMemo } from 'react';
import StatPopup from './StatPopup';
import './UserInformationPopup.css';
import Modal from './Modal';
import { useDisclosure } from '../hooks/useDisclosure';

const UserInformationPopup = ({
  isOpenUser,
  onCloseUser,
  user
}) => {

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `Joined on ${month}/${day}/${year}`;
  };

  const totalWins = useMemo(() => {
    return (user?.totalDiceGameWon || 0) + (user?.totalCrashGamesWon || 0);
  }, [user]);

  const totalBets = useMemo(() => {
    return (user?.totalDiceGamePlayed || 0) + (user?.totalCrashGamesPlayed || 0);
  }, [user]);

  const formattedDate = formatDate(user?.dateUserJoined);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const favG = user?.favoriteGame && user?.favoriteGame.toLowerCase().indexOf('dice') !== -1 ? 'dice' : 'crash';
  let favWagered = 0;
  if (favG === 'dice') {
    favWagered = user?.totalEliteGoldBetOnDice || 0;
  }
  if (favG === 'crash') {
    favWagered = user?.totalEliteGoldBetOnCrash || 0;
  }

  return (
    <>
      <Modal title={"User Information"} isOpen={isOpenUser} close={onCloseUser}>
        <div className="userinfopopup-profile_info">
          <div className="userinfopopup-profile_info-edit">
            <img
              className="userinfo-pimg"
              src={user?.profilePictureUrl || './placeholder-profile-img.jpg'}
              alt="image"
            />
            <p>{user.name}</p>
            <p>USER ID: {user ? user._id : '12357308'}</p>
          </div>
        </div>
        <div className="statcards-container">
          <div className="statcards-nav">
            <span className="stat-stat-icon">
              <img src="./Statistics.svg" alt="statistics" /> Statistics
            </span>
            <span
              onClick={() => {
                onOpen();
              }}
              className="stat-next-icon"
            >
              Details <img src="./Union-green.svg" alt="union-icon" />
            </span>
          </div>
          <div className="statcards">
            <div className="statcard">
              <p>Total Wins</p>
              <h5>{totalWins}</h5>
            </div>
            <div className="statcard">
              <p>Total Bets</p>
              <h5>{totalBets}</h5>
            </div>
            <div className="statcard">
              <p>Total Wagered</p>
              <h5>{user?.totalBetAmount}</h5>
            </div>
          </div>
        </div>
        <div className="fav-game">
          <p className="game-head-txt">Favorite Game</p>
          <hr />
          <div className="fav-info">
            <div className="fav-game-type">
              {
                favG === 'crash' && <img src="./crash-win.svg" alt="dice" />
              }
              {
                favG === 'dice' && <img src="./dice-win.svg" alt="crash" />
              }
              <span>{user?.favoriteGame || '-'}</span>
            </div>
            <div className="fav-game-amount">
              <p>Wagered</p>
              <p>eGold {favWagered}</p>
            </div>
          </div>
        </div>
        <p className="join-txt">{formattedDate}</p>
      </Modal>
      <StatPopup
        isOpen={isOpen}
        close={onClose}
        totalWins={totalWins}
        totalBets={totalBets}
        totalWagered={user?.totalBetAmount}
      />
    </>
  );
};

export default UserInformationPopup;
