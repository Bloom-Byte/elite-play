import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Recentwins from '../components/Recentwins';
import DepositCTA from '../components/DepositCTA';
import Livebets from '../components/Livebets';
import VIPCTA from '../components/VIPCTA';
import Description from '../components/Description';
import 'react-loading-skeleton/dist/skeleton.css';
import './Home.css';
import { ACCESS_TOKEN } from '../utils/constants';


const Home = () => {
  const [crashAllBets, setCrashAllBets] = useState([]);
  const [crashUserBets, setCrashUserBets] = useState([]);
  const [diceAllBets, setDiceAllBets] = useState([]);
  const [diceUserBets, setDiceUserBets] = useState([]);


  const fetchDiceAllBets = () => {
    const eventSource = new EventSource(`${import.meta.env.VITE_BASE_API_URL}/game/all-bets`);

    eventSource.onopen = () => {
      console.log('Connection established');
    };

    eventSource.onerror = (error) => {
      console.error('Error with EventSource:', error);
      eventSource.close();
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.message !== 'No recent bets') {
          setDiceAllBets(prevBets => [data, ...prevBets]);
        }
        console.log('Dice All bets:', data)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    return () => {
      eventSource.close();
    };
  };

  const fetchDiceUserBets = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const eventSource = new EventSource(`${import.meta.env.VITE_BASE_API_URL}/game/user-bets?access_token=${accessToken}`);

    eventSource.onopen = () => {
      console.log('Connection established');
    };

    eventSource.onerror = (error) => {
      console.error('Error with EventSource:', error);
      eventSource.close();
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setDiceUserBets(prevBets => [data, ...prevBets]);
        console.log('Dice User bets:', data)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    return () => {
      eventSource.close();
    };
  };

  const fetchCrashAllBets = () => {
    const eventSource = new EventSource(`${import.meta.env.VITE_BASE_API_URL}/game/crash-game/leaderboard`);

    eventSource.onopen = () => {
      console.log('Connection established');
    };

    eventSource.onerror = (error) => {
      console.error('Error with EventSource:', error);
      eventSource.close();
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setCrashAllBets(prevBets => [data, ...prevBets]);
        console.log('Crash All bets:', data)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    return () => {
      eventSource.close();
    };
  };

  const fetchCrashUserBets = () => {
    const eventSource = new EventSource(`${import.meta.env.VITE_BASE_API_URL}/crash-game/bets-resolved`);

    eventSource.onopen = () => {
      console.log('Connection established');
    };

    eventSource.onerror = (error) => {
      console.error('Error with EventSource:', error);
      eventSource.close();
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setCrashUserBets(prevBets => [data, ...prevBets]);
        console.log('Crash User bets:', data)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    return () => {
      eventSource.close();
    };
  };

  useEffect(() => {
    const fetchBetsData = async () => {
      fetchCrashUserBets();
      fetchCrashAllBets();
      fetchDiceAllBets();
      fetchDiceUserBets();
    };

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      fetchBetsData();
    }
  }, []);

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
