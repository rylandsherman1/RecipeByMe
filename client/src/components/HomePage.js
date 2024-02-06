import React, { useEffect, useState } from "react";
import DropdownFilter from "./DropdownFilter";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import { useRecipes } from "./RecipesContext";

const HomePage = () => {
  const { recipes, fetchRecipes } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const openRecipeModal = (recipe) => setSelectedRecipe(recipe);

  const closeRecipeModal = () => setSelectedRecipe(null);

  const handleFilterChange = (selectedCategory) => {
    // Implement filtering logic based on selectedCategory
  };

  return (
    <div className="home-page">
      <DropdownFilter onFilterChange={handleFilterChange} />
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onCardClick={() => openRecipeModal(recipe)} // Pass a function to open modal
          />
        ))}
      </div>
      {selectedRecipe && (
        <RecipeModal
          isOpen={!!selectedRecipe}
          recipe={selectedRecipe}
          onClose={closeRecipeModal}
        />
      )}
    </div>
  );
};

export default HomePage;
