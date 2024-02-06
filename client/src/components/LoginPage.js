import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginPage = ({ setCurrentUser }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("userId", data.user.id); // Ensure data.user.id is the correct path to the user ID
      localStorage.setItem("authToken", data.token); // Ensure data.token is the correct path to the token
      setCurrentUser(data.user || data); // Adjust based on actual response structure
      alert("Login successful!");
      history.push("/");
    } else {
      alert(`Login failed: ${data.message || "Unknown error"}`);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      // Optionally, handle login directly after signup
      alert("Signup successful!");
      setCurrentUser(data.user); // Optionally set the user on signup, if your backend returns the user
      history.push("/");
    } else {
      alert(`Signup failed: ${data.message || "Unknown error"}`);
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
    </div>
  );
};

export default LoginPage;
