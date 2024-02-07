import React from "react";
import RecipeCard from "./RecipeCard"; // Assuming RecipeCard is a component you use to display each recipe

const MyProfilePage = ({
  isAuthenticated,
  currentUser,
  userRecipes,
  likedRecipes,
}) => {
  if (!isAuthenticated) {
    return (
      <div className="my-profile-page">
        <h2>My Profile</h2>
        <p>Please sign in or sign up to view your profile.</p>
        {/* Redirect to login page or show login/signup component here */}
      </div>
    );
  }

  // Assuming userRecipes is an array of all recipes and currentUser.id matches the userId in each recipe
  const myRecipes = userRecipes.filter(
    (recipe) => recipe.userId === currentUser.id
  );

  return (
    <div className="my-profile-page">
      <h2>My Profile</h2>
      <div className="user-details">
        <p>Username: {currentUser.username}</p>
        <p>Email: {currentUser.email}</p>
        {/* Display other user details here */}
      </div>

      <section>
        <h3>My Recipes</h3>
        <div className="recipe-grid">
          {myRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section>
        <h3>Recipes I Like</h3>
        <div className="recipe-grid">
          {likedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyProfilePage;
