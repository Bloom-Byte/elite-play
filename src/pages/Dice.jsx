import React, { useState, useEffect, useCallback } from 'react';
import DiceGame from '../components/DiceGame';
import DiceTable from '../components/DiceTable';
import 'react-loading-skeleton/dist/skeleton.css';
import './Dice.css';
import { ACCESS_TOKEN } from '../utils/constants';

const Dice = () => {
  const [bets, setBets] = useState([]);
  const [userBets, setUserBets] = useState([]);


  useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_BASE_API_URL}/game/all-bets`);

    eventSource.onopen = () => {
      console.log('All bets Connection established');
    };

    eventSource.onerror = (error) => {
      console.error('Error with All Bets EventSource:', error);
      eventSource.close();
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setBets((prevBets) => {
          const newBets = [...prevBets];
          newBets.push(data);
          return newBets;
        });
        console.log('All bets:', data)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const eventSource = new EventSource(`${import.meta.env.VITE_BASE_API_URL}/game/user-bets?access_token=${accessToken}`);

    eventSource.onopen = () => {
      console.log('Connection User bets established');
    };

    eventSource.onerror = (error) => {
      console.error('Error with User bets EventSource:', error);
      eventSource.close();
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setUserBets((prevUserBets) => {
          const newUserBets = [...prevUserBets];
          newUserBets.push(data);
          return newUserBets;
        });
        console.log('User bets:', data)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    return () => {
      eventSource.close();
    };
  }, []);

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
