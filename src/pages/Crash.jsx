import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import CrashGame from '../components/CrashGame';
import CrashTable from '../components/CrashTable';
import Footer from '../components/Footer';
import ChatPopup from '../components/ChatPopup';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { isLoggedIn } from '../utils/auth';
import './Crash.css';
import instance from '../utils/api';
import { ACCESS_TOKEN } from '../utils/constants';


const Crash = () => {
  const [bets, setBets] = useState([]);
  const [userBets, setUserBets] = useState([]);

  const fetchAllBets = () => {
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
        setBets(data);
        console.log('All bets:', data)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    return () => {
      eventSource.close();
    };
  };

  const fetchUserBets = () => {
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
        setUserBets(data);
        console.log('User bets:', data)
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
      fetchAllBets();
      fetchUserBets();
    };

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    console.log(accessToken);
    if (accessToken) {
      fetchBetsData();
    }
  }, []);

  return (
    <div style={{
      padding: '0 20px',
    }}>
      <CrashGame bets={bets}
        userBets={userBets} />
      <CrashTable bets={bets}
        userBets={userBets} />
    </div>
  );
};

export default Crash;
