import Hero from '../components/Hero';
import Recentwins from '../components/Recentwins';
import DepositCTA from '../components/DepositCTA';
import Livebets from '../components/Livebets';
import VIPCTA from '../components/VIPCTA';
import Description from '../components/Description';
import 'react-loading-skeleton/dist/skeleton.css';
import './Home.css';
import { useEventSource } from '../hooks/useEventSources';


const Home = () => {
  const diceAllBets = useEventSource({
    url: '/game/all-bets'
  });
  const diceUserBets = useEventSource({
    url: '/game/user-bets',
    isAuthRequired: true
  });

  const crashAllBets = useEventSource({
    url: '/crash-game/bets-resolved'
  });
  const crashUserBets = useEventSource({
    url: '/crash-game/bets-resolved'
  });

  return (
    <>
      <div style={{ padding: '0 1rem' }}>
        <Hero />
        <Recentwins diceAllBets={diceAllBets} crashAllBets={crashAllBets} />
        <DepositCTA />
        <Livebets diceAllBets={diceAllBets} diceUserBets={diceUserBets} crashAllBets={crashAllBets} crashUserBets={crashUserBets} />
        <VIPCTA />
      </div>
      <Description />
    </>
  );
};

export default Home;
