import { useNavigate } from 'react-router-dom';
import './VIPCTA.css'
import { useAppContext } from '../hooks/useAppContext';

const VIPCTA = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();

  const handleVIPClick = () => {
    if (state.user) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ backgroundImage: 'url("/learn-bg.svg")' }} className={`vip-cta`}>
      <div className='vip-cta_text'>
        <h4>Join & Unlock VIP Rewards at Eliteplay</h4>
        <p>Only available in the VIP Club</p>
        <button onClick={handleVIPClick}>{state.user ? 'Learn More' : 'Sign Up Now'}</button>
      </div>
    </div>
  )
}

export default VIPCTA