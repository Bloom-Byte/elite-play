import DiceGame from '../components/DiceGame';
import DiceTable from '../components/DiceTable';
import 'react-loading-skeleton/dist/skeleton.css';
import './Dice.css';
import { useEventSource } from '../hooks/useEventSources';

const Dice = () => {
  const bets = useEventSource({
    url: '/game/all-bets'
  });
  const userBets = useEventSource({
    url: '/game/user-bets',
    isAuthRequired: true
  });

  return (
    <div style={{ padding: '0 1rem' }}>
      <DiceGame
        userBets={userBets}
        bets={bets}
      />
      <DiceTable
        bets={bets}
        userBets={userBets}
      />
    </div>
  );
};

export default Dice;
