import React from "react";
import RecipeCard from "./RecipeCard"; // Assuming RecipeCard is a component you use to display each recipe
import { useRecipes } from "./RecipesContext"; // Import useRecipes hook from your RecipesContext

const MyProfilePage = ({ currentUser }) => {
  const { recipes, likedRecipes } = useRecipes(); // Use the useRecipes hook to get recipes and likedRecipes

  // Check if currentUser is defined before accessing its properties
  const profileHeader = currentUser
    ? `${currentUser.username}'s Profile`
    : "Profile";

  // Filtering user's own recipes, ensure currentUser is defined
  const myRecipes = currentUser
    ? recipes.filter((recipe) => recipe.userId === currentUser.id)
    : [];

  // Filter recipes that are liked by the current user
  const myLikedRecipes =
    likedRecipes.length > 0
      ? recipes.filter((recipe) => likedRecipes.includes(recipe.id))
      : [];

  // Conditional rendering based on available recipes
  const renderRecipes = (recipes, sectionTitle) => {
    if (recipes.length > 0) {
      return (
        <section>
          <h3>{sectionTitle}</h3>
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      );
    }
    return <p>No {sectionTitle.toLowerCase()} available.</p>;
  };

  return (
    <div className="my-profile-page">
      <h2>{profileHeader}</h2>
      {currentUser && (
        <div className="user-details">
          <p>Username: {currentUser.username}</p>
          <p>Email: {currentUser.email}</p>
          {/* Display other user details here */}
        </div>
      )}

      {renderRecipes(myRecipes, "My Recipes")}
      {renderRecipes(myLikedRecipes, "Recipes I Like")}
    </div>
  );
};

export default MyProfilePage;
