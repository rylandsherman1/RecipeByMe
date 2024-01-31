import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import MyProfilePage from "./components/MyProfilePage";
import About from "./components/About";
import LoginPage from "./components/LoginPage";
import NewRecipeButton from "./components/NewRecipeButton"; // Make sure to import NewRecipeButton

function App() {
  return (
    <Router>
      <NavBar /> {/* Include NavBar here for global visibility */}
      <NewRecipeButton />{" "}
      {/* Include NewRecipeButton here for global visibility */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/myprofile">
          <MyProfilePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
