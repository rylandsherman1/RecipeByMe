import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal"; // Assuming you have a RecipeModal component
import { useRecipes } from "./RecipesContext";

const MyProfilePage = ({ currentUser }) => {
  const { recipes, likedRecipes } = useRecipes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const onCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const profileHeader = currentUser
    ? `${currentUser.username}'s Profile`
    : "Profile";

  const myLikedRecipes =
    likedRecipes.length > 0
      ? recipes.filter((recipe) => likedRecipes.includes(recipe.id))
      : [];

  const renderLikedRecipes = (likedRecipes) => {
    if (likedRecipes.length > 0) {
      return (
        <section>
          <h3>Recipes I Like</h3>
          <div className="recipe-grid">
            {likedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        </section>
      );
    }
    return <p>No liked recipes available.</p>;
  };

  return (
    <div className="my-profile-page">
      <h2>{profileHeader}</h2>
      {currentUser && (
        <div className="user-details">
          <p>Username: {currentUser.username}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      )}
      {renderLikedRecipes(myLikedRecipes)}
      <RecipeModal
        isOpen={isModalOpen}
        recipe={selectedRecipe}
        onClose={closeModal}
      />
    </div>
  );
};

export default MyProfilePage;
