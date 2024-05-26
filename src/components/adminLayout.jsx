import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import ChatPopup from './ChatPopup';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { CHAT_WIDTH, NAV_WIDTH } from '../utils/constants';
import { useAppContext } from '../hooks/useAppContext';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useWindowWidth } from '../hooks/useWIndowWidth';
import { useChat, useNav } from '../hooks/useUtils';
import AdminSideNav from './AdminSideNav';

function AdminLayout() {
  const { state } = useAppContext();
  const windowWidth = useWindowWidth();
  const { closeChat } = useChat();
  const { closeNav } = useNav();

  useEffect(() => {
    closeChat()
  }, [windowWidth, closeChat]);

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
            count={1}
            baseColor="#0B1210"
            highlightColor="#6E6E71"
            height={'100vh'}
          />
        </>
      ) : (
        <>
          <div style={{
            background: '#0D1513',
            minHeight: 'calc(100vh - 5rem)',
          }}>
            <div style={{
              minHeight: 'calc(100vh - 5rem)',
            }}>
              <AdminNavBar />
              <AdminSideNav />
              <div className='layout-main' style={{
                transition: 'all 0.3s ease',
                marginLeft: mainMarginLeft,
                width: mainWidth,
                background: '#0D1513',
                marginTop: '5rem',
                padding: '8px 0',
                position: 'relative',
                height: `100%`,
                minHeight: 'calc(100vh - 5rem)',
              }}>
                <Outlet />
              </div>
            </div>
            <ChatPopup />
          </div>
        </>
      )}
    </div>
  );
}

export default AdminLayout;