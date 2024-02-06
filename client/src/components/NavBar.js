import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ currentUser, logout }) => {
  return (
    <nav className="navbar">
      {/* Display the currently signed-in user's username if available */}
      {currentUser && (
        <p className="signed-in-as">Signed in as: {currentUser.username}</p>
      )}
      <h2 className="site-title">Welcome to RecipeByMe!</h2>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/myprofile" className="nav-link">
            My Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About Us
          </Link>
        </li>
        {!currentUser ? (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Sign In/Sign Up
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <button
              onClick={logout}
              className="nav-link"
              style={{ border: "none", background: "none" }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
