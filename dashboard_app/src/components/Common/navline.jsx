import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLine = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/inventory', label: 'Inventory', icon: 'bi-box-seam' },
    { path: '/sales', label: 'Sales', icon: 'bi-graph-up' },
    { path: '/finance', label: 'Finance', icon: 'bi-currency-dollar' },
    { path: '/reports', label: 'Reports', icon: 'bi-file-earmark-bar-graph' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        {/* Brand/Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
          <img 
            src="/ecwlogo.png" 
            alt="ECW Logo" 
            className="me-2"
            style={{ height: '32px', width: 'auto' }}
          />
          <span className="fw-bold d-none d-sm-inline">Management Dashboard</span>
          <span className="fw-bold d-inline d-sm-none">Dashboard</span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navigationItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  className={`nav-link d-flex align-items-center ${
                    isActive(item.path) ? 'active fw-semibold' : ''
                  }`}
                  to={item.path}
                  onClick={closeMenu}
                >
                  <i className={`${item.icon} me-2`}></i>
                  <span className="d-none d-md-inline">{item.label}</span>
                  <span className="d-inline d-md-none">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* User Actions */}
          <div className="d-flex align-items-center">
            {/* Notifications Dropdown */}
            <div className="dropdown me-3">
              <button
                className="btn btn-outline-light btn-sm dropdown-toggle"
                type="button"
                id="notificationsDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-bell"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationsDropdown">
                <li><h6 className="dropdown-header">Notifications</h6></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-info-circle me-2"></i>New order received</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-exclamation-triangle me-2"></i>Low stock alert</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-check-circle me-2"></i>Payment processed</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-center" href="#">View all notifications</a></li>
              </ul>
            </div>

            {/* User Profile Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="bg-white text-primary rounded-circle me-2 d-flex align-items-center justify-content-center" 
                     style={{ width: '24px', height: '24px', fontSize: '12px', fontWeight: 'bold' }}>
                  AU
                </div>
                <span className="d-none d-lg-inline">Admin User</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><h6 className="dropdown-header">Account</h6></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-question-circle me-2"></i>Help</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={onLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavLine;
