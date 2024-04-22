import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import DiceGame from '../components/DiceGame'
import DiceTable from '../components/DiceTable'
import Footer from '../components/Footer'
import './Dice.css'

const Dice = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bets, setBets] = useState([]);
  const [userBets, setUserBets] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  const fetchUserProfile = async (accessToken) => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://be.eliteplay.bloombyte.dev/user/me',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        setLoading(false);
      } else {
        console.error('Failed to fetch user profile:', response.statusText);
        setLoading(false);
      }
    } catch (error) {

      console.error('Error fetching user profile:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchUserProfile(accessToken);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    // Construct the EventSource object
    const eventSource = new EventSource(`https://be.eliteplay.bloombyte.dev/game/all-bets`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Handle incoming messages
    eventSource.onmessage = (event) => {
      const newBet = JSON.parse(event.data);
      setBets((prevBets) => [...prevBets, newBet]);
    };

    // Handle any errors
    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    // Clean up
    return () => {
      eventSource.close();
    };
  }, [accessToken]);

  useEffect(() => {
    // Create an EventSource object to listen to events from the server
    const eventSource = new EventSource(`https://be.eliteplay.bloombyte.dev/game/user-bets`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Listen to messages on the event stream
    eventSource.onmessage = function(event) {
      const newBet = JSON.parse(event.data);
      setUserBets(prevBets => [...prevBets, newBet]);
    };

    // Listen for errors
    eventSource.onerror = function(error) {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    // Cleanup when component unmounts
    return () => eventSource.close();
  }, [accessToken]);



  return (
    <div>
      <Navbar isNavOpen={isNavOpen} user={userProfile} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <DiceGame isNavOpen={isNavOpen} user={userProfile} />
      <DiceTable isNavOpen={isNavOpen} bets={bets} userBets={userBets} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  )
}

export default Dice
