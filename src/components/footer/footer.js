import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <span className="site-footer-logo">🍵 Tea Blog</span>
          <p className="site-footer-tagline">
            Notes, brews, and rituals for anyone who steeps their day in tea.
          </p>
        </div>
        <nav className="site-footer-links">
          <Link to="/" className="custom-link">
            Home
          </Link>
          <Link to="/login" className="custom-link">
            Login
          </Link>
          <Link to="/register" className="custom-link">
            Register
          </Link>
        </nav>
      </div>
      <div className="site-footer-bottom">
        &copy; {year} Tea Blog. Brewed with care.
      </div>
    </footer>
  );
};

export default Footer;
