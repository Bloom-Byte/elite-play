import CrashGame from '../components/CrashGame';
import CrashTable from '../components/CrashTable';
import 'react-loading-skeleton/dist/skeleton.css';
import './Crash.css';
import { useEventSource } from '../hooks/useEventSources';


const Crash = () => {
  // const bets = useEventSource({
  //   url: '/game/crash-game/leaderboard'
  // });
  const bets = useEventSource({
    url: '/crash-game/bets-resolved'
  });
  
  return (
    <div style={{
      padding: '0 20px',
    }}>
      <CrashGame bets={bets} />
      <CrashTable bets={bets}/>
    </div>
  );
};

export default Crash;
