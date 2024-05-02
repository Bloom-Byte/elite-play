import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import DiceGame from '../components/DiceGame';
import DiceTable from '../components/DiceTable';
import Footer from '../components/Footer';
import ChatPopup from '../components/ChatPopup';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { isLoggedIn } from '../utils/auth';
import './Dice.css';


function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
      function updateSize() {
          setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Dice = () => {
  const [width, height] = useWindowSize();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(width > 768);
  const [bets, setBets] = useState([]);
  const [userBets, setUserBets] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const userIsLoggedIn = isLoggedIn();

  // if (!userIsLoggedIn) {
  //   window.location.href = '/';
  // }

  const fetchAllBets = () => {
    const eventSource = new EventSource('https://be.eliteplay.bloombyte.dev/game/all-bets');
  
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
  const accessToken = localStorage.getItem('accessToken');
  const eventSource = new EventSource(`https://be.eliteplay.bloombyte.dev/game/user-bets?access_token=${accessToken}`);

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
     fetchAllBets();
     fetchUserBets();
    };

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      fetchUserProfile(accessToken);
      fetchBetsData();
    } else {
      setLoading(false);
    }
    setChatOpen(width > 768)
  }, []);

  // useEffect(() => {
  //       // Fetch data every 1 minute
  //       const intervalId = setInterval(fetchBetsData, 60000);

  //       // Cleanup
  //       return () => clearInterval(intervalId);
  // }, [])

  return (
    <div>
      {loading ? (
        <>
          <Skeleton
            count={8}
            baseColor="#0B1210"
            highlightColor="#6E6E71"
            height={100}
          />
        </>
      ) : (
        <>
          <div className="home-container">
            <div className={`${chatOpen ? 'min-page-chat' : ''}`}>
              <Navbar isNavOpen={isNavOpen} user={userProfile} chatOpen={chatOpen} setChatOpen={setChatOpen} setIsNavOpen={setIsNavOpen} />
              <Sidenav
                isNavOpen={isNavOpen}
                setIsNavOpen={setIsNavOpen}
                user={userProfile}
                chatOpen={chatOpen} setChatOpen={setChatOpen}
              />
              <DiceGame
                isNavOpen={isNavOpen}
                user={userProfile}
                userBets={userBets}
                bets={bets}
                chatOpen={chatOpen}
              />
              <DiceTable
                isNavOpen={isNavOpen}
                bets={bets}
                userBets={userBets}
              />
              <Footer isNavOpen={isNavOpen} />
            </div>
            {chatOpen && (
              <ChatPopup chatOpen={chatOpen} setChatOpen={setChatOpen} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dice;
