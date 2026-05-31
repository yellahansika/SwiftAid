import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isDarkNav = location.pathname === '/' || location.pathname === '/dashboard';

  return (
    <nav className={`navbar ${isDarkNav ? 'dark-nav' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <i className="fas fa-truck-medical"></i>
          Swift<span>Aid</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/features" className={location.pathname.includes('/features') ? 'active' : ''}>Features</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          <Link to="/sos" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', marginLeft: '1rem', color: 'white' }}>Get Help</Link>
        </div>
        <button className="hamburger"><i className="fas fa-bars"></i></button>
      </div>
    </nav>
  );
}

export default Navbar;
