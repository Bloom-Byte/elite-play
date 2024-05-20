import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import ChatPopup from '../components/ChatPopup';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IoChatbubblesOutline } from "react-icons/io5";

import { CHAT_WIDTH, NAV_WIDTH } from '../utils/constants';
import { useAppContext } from '../hooks/useAppContext';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useWindowWidth } from '../hooks/useWIndowWidth';
import { useChat, useNav } from '../hooks/useUtils';

function Layout() {
  const { state } = useAppContext();
  const windowWidth = useWindowWidth();
  const { openChat } = useChat();
  const { closeNav } = useNav();

  useEffect(() => {
    if (windowWidth > 1200 && !state.chatOpen) {
      openChat();
    }
  }, [openChat, windowWidth, state.chatOpen]);

  useEffect(() => {
    if (windowWidth <= 768 && state.isNavOpen) {
      closeNav();
    }
  }, []);

  const mainWidth = useMemo(() => {
    const navWidth = state.isNavOpen ? NAV_WIDTH : 85;
    if (windowWidth <= 480) {
      return `100%`;
    }
    if (windowWidth <= 768) {
      return `calc(100% - 85px)`;
    }
    if (windowWidth <= 1200) {
      return `calc(100% - ${navWidth}px)`;
    }
    const chatWidth = state.chatOpen ? CHAT_WIDTH : 0;
    return `calc(100% - calc(${navWidth}px + ${chatWidth}px))`;
  }, [state.isNavOpen, state.chatOpen, windowWidth]);

  const updateUser = useUpdateUser();

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  const mainMarginLeft = useMemo(() => {
    if (windowWidth <= 480) {
      return '0';
    }
    if (windowWidth <= 768) {
      return '85px';
    }
    if (state.isNavOpen) {
      return `${NAV_WIDTH}px`;
    } else {
      return '85px';
    }
  }, [state.isNavOpen, windowWidth])

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
              <Navbar />
              <Sidenav />
              <div className='layout-main' style={{
                transition: 'all 0.3s ease',
                marginLeft: mainMarginLeft,
                width: mainWidth,
                background: '#0D1513',
                marginTop: '5rem',
                padding: '8px 0',
                position: 'relative'
              }}>
                <div className='openChat'>
                  <IoChatbubblesOutline
                    onClick={() => openChat()}
                  />
                </div>
                <Outlet />
                <Footer />
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