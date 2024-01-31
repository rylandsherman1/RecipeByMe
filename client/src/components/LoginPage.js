import React, { useState } from "react";

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true); // Toggle view between login and sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Additional state for sign up
  const [username, setUsername] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleLogin = () => {
    // Implement login logic here
    console.log("Logging in with email:", email, "and password:", password);
    // Integrate with your authentication logic
  };

  const handleSignup = () => {
    // Implement sign up logic here
    console.log(
      "Signing up with username:",
      username,
      "email:",
      email,
      "and password:",
      password
    );
    // Integrate with your authentication logic
  };

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="login-page">
      <h2>{isLoginView ? "Login" : "Sign Up"}</h2>
      <form>
        {!isLoginView && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-action">
          {isLoginView ? (
            <button type="button" onClick={handleLogin}>
              Sign In
            </button>
          ) : (
            <button type="button" onClick={handleSignup}>
              Sign Up
            </button>
          )}
          <button type="button" onClick={toggleView}>
            {isLoginView ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
