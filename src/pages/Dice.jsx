import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import DiceGame from '../components/DiceGame'
import DiceTable from '../components/DiceTable'
import Footer from '../components/Footer'
import './Dice.css'

const Dice = () => {
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bets, setBets] = useState([]);
  const [userBets, setUserBets] = useState([]);
  const accessToken = localStorage.getItem('accessToken');


  const fetchAllBets = async () => {
    try {
      const response = await axios.get(
        'https://be.eliteplay.bloombyte.dev/game/all-bets',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setBets(response.data);
      console.log('all bets', response.data)
    } catch (error) {
      console.error('Error fetching all bets:', error);
    }
  };

  const fetchUserBets = async () => {
    try {
      const response = await axios.get(
        'https://be.eliteplay.bloombyte.dev/game/user-bets',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setUserBets(response.data);
      console.log('user bets', response.data)
    } catch (error) {
      console.error('Error fetching user bets:', error);
    }
  };

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
    const fetchBetsData = async () => {
      await fetchAllBets();
      await fetchUserBets();
    };

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchUserProfile(accessToken);
      fetchBetsData();
    } else {
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //       // Fetch data every 1 minute
  //       const intervalId = setInterval(fetchBetsData, 60000);

  //       // Cleanup
  //       return () => clearInterval(intervalId);
  // }, [])

  


  return (
    <div>
      <Navbar isNavOpen={isNavOpen} user={userProfile} />
      <Sidenav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <DiceGame isNavOpen={isNavOpen} user={userProfile} userBets={userBets}  />
      <DiceTable isNavOpen={isNavOpen} bets={bets} userBets={userBets} />
      <Footer isNavOpen={isNavOpen} />
    </div>
  )
}

export default Dice
