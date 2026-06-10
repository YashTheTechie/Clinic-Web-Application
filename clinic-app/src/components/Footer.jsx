import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Services', path: '/services' },
    { name: 'Book Appointment', path: '/book-appointment' },
    { name: 'Patient Reviews', path: '/reviews' },
    { name: 'About Us', path: '/about' },
  ];

  const services = [
    'Chronic Diseases',
    'Skin Disorders',
    'Child Health',
    'Womens Health',
    'Mental Wellness',
    'Allergies and Immunity',
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-circle">H</div>
              <div className="logo-text">
                <span className="logo-main">HomeoEase</span>
                <span className="logo-sub">Clinic</span>
              </div>
            </div>
            <p className="footer-desc">
              Healing naturally with the power of homeopathy.
              Trusted by thousands of patients for gentle,
              effective, and holistic care.
            </p>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">Our Services</h3>
            <ul className="footer-list">
              {services.map((service) => (
                <li key={service}>
                  <span className="footer-text">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-label">Address</span>
                <span className="contact-value">
                  123, Healing Street, Near City Hospital,
                  Mumbai, Maharashtra - 400001
                </span>
              </li>
              <li>
                <span className="contact-label">Phone</span>
                <a href="tel:+919876543210" className="contact-value contact-link">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <span className="contact-label">Email</span>
                <a href="mailto:info@homeoease.com" className="contact-value contact-link">
                  info@homeoease.com
                </a>
              </li>
              <li>
                <span className="contact-label">Hours</span>
                <span className="contact-value">Mon - Sat: 9:00 AM to 7:00 PM</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>2024 HomeoEase Clinic. All rights reserved.</p>
          <p>Designed with care for better health</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;