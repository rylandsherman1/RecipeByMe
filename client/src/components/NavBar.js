import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h2 className="site-title">Welcome to RecipeByMe!</h2>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/myprofile" className="nav-link">
            {" "}
            My Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About Us
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign In/Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
