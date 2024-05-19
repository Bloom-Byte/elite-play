import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import ChatPopup from '../components/ChatPopup';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { CHAT_WIDTH, NAV_WIDTH } from '../utils/constants';
import { useAppContext } from '../hooks/useAppContext';
import { useUpdateUser } from '../hooks/useUpdateUser';

function Layout() {
  const { state } = useAppContext();

  const mainWidth = useMemo(() => {
    const navWidth = state.isNavOpen ? NAV_WIDTH : 85;
    const chatWidth = state.chatOpen ? CHAT_WIDTH : 0;
    return `calc(100% - calc(${navWidth}px + ${chatWidth}px))`;
  }, [state.isNavOpen, state.chatOpen]);

  const updateUser = useUpdateUser();

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  return (
    <div>
      {state.userLoading ? (
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
          <div>
            <div>
              <Navbar/>
              <Sidenav />
              <div className='layout-main' style={{
                transition: 'all 0.3s ease',
                marginLeft: state.isNavOpen ? `${NAV_WIDTH}px` : '85px',
                width: mainWidth,
                background: '#0D1513',
                marginTop: '5rem',
                padding: '8px 0',
              }}>
                <Outlet/>
                <Footer/>
              </div>
            </div>
            <ChatPopup />
          </div>
        </>
      )}
    </div>
  );
}

export default Layout;