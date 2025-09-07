import { Link, useLocation } from 'react-router-dom'
import '../css/components/Navbar.css'

const Navbar = ({ onLogout }) => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <img 
              src="/ecwlogo.png" 
              alt="ECW Logo" 
              className="logo-image"
            />
            <span className="logo-text">Management Dashboard</span>
          </Link>
        </div>

        <nav className="navbar-nav">
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link
                to="/"
                className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/inventory"
                className={`navbar-link ${isActive('/inventory') ? 'active' : ''}`}
              >
                Inventory
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/sales"
                className={`navbar-link ${isActive('/sales') ? 'active' : ''}`}
              >
                Sales
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/finance"
                className={`navbar-link ${isActive('/finance') ? 'active' : ''}`}
              >
                Finance
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/reports"
                className={`navbar-link ${isActive('/reports') ? 'active' : ''}`}
              >
                Reports
              </Link>
            </li>
          </ul>
        </nav>

        <div className="navbar-user">
          {/* <div className="user-info">
            <span className="user-name">Admin User</span>
            <div className="user-avatar">AU</div>
          </div> */}
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
