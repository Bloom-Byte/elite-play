import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Hero from '../components/Hero';
import Recentwins from '../components/Recentwins';
import DepositCTA from '../components/DepositCTA';
import Livebets from '../components/Livebets';
import VIPCTA from '../components/VIPCTA';
import Description from '../components/Description';
import Footer from '../components/Footer';
import ChatPopup from '../components/ChatPopup';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Home.css';


const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isNavOpen, setIsNavOpen] = useState(width > 768);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(width > 768);
  const [crashAllBets, setCrashAllBets] = useState([]);
  const [crashUserBets, setCrashUserBets] = useState([]);
  const [diceAllBets, setDiceAllBets] = useState([]);
  const [diceUserBets, setDiceUserBets] = useState([]);

  
  const fetchDiceAllBets = () => {
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
        setDiceAllBets(prevBets => [data, ...prevBets]);
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
    const eventSource = new EventSource('https://be.eliteplay.bloombyte.dev/game/crash-game/leaderboard');
  
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
  const eventSource = new EventSource('https://be.eliteplay.bloombyte.dev/crash-game/bets-resolved');

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
      fetchCrashUserBets();
      fetchCrashAllBets();
      fetchDiceAllBets();
      fetchDiceUserBets();
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
              <Hero chatOpen={chatOpen} isNavOpen={isNavOpen} user={userProfile} />
              <Recentwins chatOpen={chatOpen} isNavOpen={isNavOpen} diceAllBets={diceAllBets} crashAllBets={crashAllBets} />
              <DepositCTA chatOpen={chatOpen} isNavOpen={isNavOpen} />
              <Livebets chatOpen={chatOpen} isNavOpen={isNavOpen} diceAllBets={diceAllBets} diceUserBets={diceUserBets} crashAllBets={crashAllBets} crashUserBets={crashUserBets} />
              <VIPCTA chatOpen={chatOpen} isNavOpen={isNavOpen} />
              <Description chatOpen={chatOpen} isNavOpen={isNavOpen} />
              <Footer chatOpen={chatOpen} isNavOpen={isNavOpen} />
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

export default Home;
