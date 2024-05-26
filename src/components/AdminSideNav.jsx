import { Link, useLocation } from 'react-router-dom';
import './Sidenav.css';
import { useAppContext } from '../hooks/useAppContext';

const AdminSideNav = () => {
  const location = useLocation();
  const isReferralsPage = location.pathname === '/referrals';
  const { state } = useAppContext();

  return (
    <>
      <div className={`sidenav-expanded ${state.isNavOpen ? 'open' : ''}`}>
        <div className="sidenav__links">
          <div>
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <div className={`sidenav__link ${isReferralsPage ? 'active' : ''}`}>
                <img src="/customer-support.svg" alt="reward-icon" />
                <span>Tickets</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideNav;
