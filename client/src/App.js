import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import MyProfilePage from "./components/MyProfilePage";
import About from "./components/About";
import LoginPage from "./components/LoginPage";
import NewRecipeButton from "./components/NewRecipeButton";
import { RecipesProvider } from "./components/RecipesContext";
import { UserProvider } from "./components/UserContext"; // Ensure UserProvider is imported

function App() {
  return (
    <UserProvider>
      <RecipesProvider>
        <Router>
          <NavBar />
          <NewRecipeButton />
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/myprofile" component={MyProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Router>
      </RecipesProvider>
    </UserProvider>
  );
}

export default App;
