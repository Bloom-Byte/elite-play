import { isLoggedIn } from '../utils/auth';
import './Hero.css';
import { useAppContext } from '../hooks/useAppContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const userIsLoggedIn = isLoggedIn();

  const { state } = useAppContext();

  return (
    <>
      <div
        style={{ backgroundImage: 'url("/elite-bg.svg")' }}
        className={`home-hero`}
      >
        {userIsLoggedIn ? (
          <div className="home-hero__user-info">
            <h4 className="vip-progress-head">Welcome Back, {state.user?.name}</h4>
            <div className="home-hero__user-info-box">
              <h4>VIP Progress</h4>
              <input
                className="range-level"
                type="range"
                min="0"
                max="20000000"
                value={state.user?.totalBetAmount}
                // onChange={(event) => setLevel(event.target.value)}
              />
              <div className="home-hero__user-info-box__level">
                <div className="hero__rank-info">
                  <span>Rank:</span>
                  <span className="bronze">{state.user?.currentTier}</span>
                </div>
                <div className="hero__rank-info">
                  <span>Next:</span>
                  <span className="silver"> {state.user?.nextTier}</span>
                  <span className="xp">{state.user?.amountToNextTier}XP</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="home-hero__txt-section">
            <h4>Turn Playtime to Paytime</h4>
            <p>Dive into a world of incredible rewards.</p>
            <Link style={{ textDecoration: 'none', transition: '.3s' }} to="/register"> <button>Sign Up Now</button></Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
