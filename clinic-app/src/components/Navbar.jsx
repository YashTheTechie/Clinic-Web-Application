import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { patient, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Book Appointment', path: '/book-appointment' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <div className="logo-circle">H</div>
          <div className="logo-text">
            <span className="logo-main">HomeoEase</span>
            <span className="logo-sub">Clinic</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="navbar-auth" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {patient ? (
            <>
              <Link
                to="/my-appointments"
                style={{ fontSize: '14px', color: '#1a6b4a', fontWeight: '600', textDecoration: 'none' }}
              >
                My Appointments
              </Link>
              <span style={{ fontSize: '14px', color: '#1a6b4a', fontWeight: '600' }}>
                Hi, {patient.fullName.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                style={{ padding: '8px 20px', background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#cc0000', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-solid">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger Menu Icon */}
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={isOpen ? 'bar rotate-top' : 'bar'}></span>
          <span className={isOpen ? 'bar hide' : 'bar'}></span>
          <span className={isOpen ? 'bar rotate-bottom' : 'bar'}></span>
        </button>

      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        
        {/* Mobile Auth Section */}
        <div className="mobile-auth" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center', marginTop: '15px' }}>
          {patient ? (
            <>
              <span style={{ fontSize: '14px', color: '#1a6b4a', fontWeight: '600', marginBottom: '5px' }}>
                Hi, {patient.fullName.split(' ')[0]}
              </span>
              <Link
                to="/my-appointments"
                onClick={() => setIsOpen(false)}
                style={{ fontSize: '14px', color: '#1a6b4a', fontWeight: '600', textDecoration: 'none', marginBottom: '10px' }}
              >
                My Appointments
              </Link>
              <button
                onClick={handleLogout}
                style={{ width: '100%', padding: '10px', background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#cc0000', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="btn-outline" style={{ width: '100%', textAlign: 'center' }}>Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="btn-solid" style={{ width: '100%', textAlign: 'center' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;