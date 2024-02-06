import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext"; // Import useUser hook

const NavBar = () => {
  const { currentUser, logout } = useUser(); // Access currentUser and logout from UserContext

  return (
    <nav className="navbar">
      {currentUser && (
        <p className="signed-in-as">Signed in as: {currentUser.username}</p> // Display the username if currentUser is present
      )}
      <h2 className="site-title">Welcome to RecipeByMe!</h2>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/myprofile" className="nav-link">
            My Profile
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
            <button onClick={logout} className="nav-link logout-button">
              Logout
            </button>{" "}
            {/* // Call the logout function on click */}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
