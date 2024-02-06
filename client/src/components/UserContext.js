import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  const login = (user, token) => {
    setCurrentUser(user);
    setAuthToken(token);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem("authToken");
    alert("Logout successful!");
  };

  return (
    <UserContext.Provider value={{ currentUser, authToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
