import { useNavigate } from 'react-router-dom';
import './DepositCTA.css'
import { useAppContext } from '../hooks/useAppContext';

const DepositCTA = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();

  const handleDepositClick = () => {
    if (state.user) {
      navigate('/wallet');
    } else {
      navigate('/login');
    }
  };

  return (
    <div
      style={{ backgroundImage: 'url("/deposit-bg.svg")' }}
      className={`deposit-cta`}
    >
      <div className="deposit-cta__txt">
        <h4>Quick & Easy Start:<br></br> Your Gateway to Fun <span className='begin-now'>Begins Now!</span></h4>
      </div>
      <button onClick={handleDepositClick}>Deposit</button>
    </div>
  )
}

export default DepositCTA
