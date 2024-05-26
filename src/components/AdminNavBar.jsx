import './Navbar.css';
import { useAppContext } from '../hooks/useAppContext';
import { useNav } from '../hooks/useUtils';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../hooks/useWIndowWidth';
import { Button, useToast } from '@chakra-ui/react';
import { useLogout } from '../hooks/useLogout';

const AdminNavBar = () => {
  const { state } = useAppContext();
  const { toggleNav } = useNav();

  const width = useWindowWidth();
  const toast = useToast();
  const logout = useLogout();

  const handleLogout = () => {
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    logout();
  };

  return (
    <>
      <div className="nav">
        <div className={`nav-games ${state.isNavOpen ? 'nav-expanded' : ''} ${state.chatOpen ? 'min-page-chat' : ''}`}>
          <div className="nav__icon">
            <img
              className="nav-icon"
              onClick={() => toggleNav()}
              src="/menu-01.svg"
              alt="close-icon"
            />
            <Link to="/admin">
              <img className="nav-logo" src={
                width > 768 ? '/eliteplay.svg' : '/eliteplay-sm.png'
              } alt="logo" />
            </Link>
          </div>
        </div>

        <div className="nav-auth">
          <Button colorScheme='red' onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </>
  );
};

export default AdminNavBar;
