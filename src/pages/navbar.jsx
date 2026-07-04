import React, { useState } from "react";
import Logo from "./Assets/logo.png";
import NavbarItems from "./navbarItems";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar-container">
      <div className="top-bar">TEA BLOG - LEARN ALL ABOUT TEA</div>
      <div className="navbar">
        <Link to={"/"} className="logo-item">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`nav-items ${isOpen ? "open" : ""}`}>
          <NavbarItems />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
