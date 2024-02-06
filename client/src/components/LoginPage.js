import React, { useState } from "react";

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true); // Toggle view between login and sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // Track the current user

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleLogin = async () => {
    console.log("Logging in with email:", email, "and password:", password);
    // Here, you would replace the console.log with a call to your backend API to authenticate the user
    // For example:
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      setCurrentUser(data.user); // Assuming the API response includes user data
    } else {
      alert(data.message); // Assuming the API response includes a message for failed logins
    }
  };

  const handleSignup = async () => {
    console.log(
      "Signing up with username:",
      username,
      "email:",
      email,
      "and password:",
      password
    );

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json(); // Assuming the server responds with JSON

      if (response.ok) {
        console.log("Signup successful", data);
        // Here you might want to automatically log the user in or redirect them to the login page
        // For example: setCurrentUser(data.user); if you have a state for the current user
      } else {
        // Handle server errors or validation errors
        console.error("Signup failed", data.message); // Assuming the server sends back an error message
        alert(`Signup failed: ${data.message}`); // Display error message to the user
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error", error);
      alert("Network error, please try again later.");
    }
  };

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="login-page">
      <h2>{isLoginView ? "Login" : "Sign Up"}</h2>
      <form onSubmit={isLoginView ? handleLogin : handleSignup}>
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
          <button type="submit">{isLoginView ? "Sign In" : "Sign Up"}</button>
          <button type="button" onClick={toggleView}>
            {isLoginView
              ? "Need to create an account?"
              : "Already have an account?"}
          </button>
        </div>
      </form>
      {currentUser && <p>Welcome, {currentUser.username}!</p>}{" "}
      {/* Display welcome message for logged-in users */}
    </div>
  );
};

export default LoginPage;
