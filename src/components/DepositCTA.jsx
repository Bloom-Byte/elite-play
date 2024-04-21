import React from 'react'
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
import './DepositCTA.css'

const DepositCTA = ({isNavOpen}) => {
  const userIsLoggedIn = isLoggedIn();
  const navigate = useNavigate();

  const handleDepositClick = () => {
    if (userIsLoggedIn) {
      navigate('/wallet');
    } else {
      navigate('/register');
    }
  };

  return (
    <div
      style={{ backgroundImage: 'url("/deposit-bg.svg")' }}
      className={`deposit-cta ${isNavOpen ? 'deposit-cta-extended' : ''}`}
    >
      <div className="deposit-cta__txt">
        <h4>Quick & Easy Start:<br></br> Your Gateway to Fun <span className='begin-now'>Begins Now! </span></h4>
      </div>
      <button onClick={handleDepositClick}>Deposit</button>
    </div>
  )
}

export default DepositCTA
