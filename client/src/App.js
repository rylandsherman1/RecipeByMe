import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import MyProfilePage from "./components/MyProfilePage";
import About from "./components/About";
import LoginPage from "./components/LoginPage";
import NewRecipeButton from "./components/NewRecipeButton";
import { RecipesProvider } from "./components/RecipesContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null); // State to track the current user

  // Function to handle logout
  const logout = () => {
    alert("Logout successful!");
    setCurrentUser(null); // Clear the current user
    // Here you might also want to clear any stored tokens if using token-based authentication
  };

  return (
    <RecipesProvider>
      <Router>
        <NavBar currentUser={currentUser} logout={logout} />{" "}
        {/* Pass currentUser and logout as props */}
        <NewRecipeButton />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/myprofile">
            <MyProfilePage />
          </Route>
          <Route path="/login">
            {/* Pass setCurrentUser as a prop to LoginPage to update the user's state on successful login/signup */}
            <LoginPage setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </RecipesProvider>
  );
}

export default App;
