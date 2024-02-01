import React, { useState } from "react";
import DropdownFilter from "./DropdownFilter"; // Make sure to add this import
import RecipeCard from "./RecipeCard"; // Import your RecipeCard component
import RecipeModal from "./RecipeModal"; // Import your RecipeModal component

// Sample recipe data (you will replace this with actual data from your API)
const sampleRecipes = [
  {
    id: 1,
    title: "Recipe 1",
    imageUrl: "url_to_image_1.jpg",
    // Other recipe data...
  },
  {
    id: 2,
    title: "Recipe 2",
    imageUrl: "url_to_image_2.jpg",
    // Other recipe data...
  },
  // Add more recipes...
];

const HomePage = () => {
  const [recipes, setRecipes] = useState(sampleRecipes); // State to store recipes
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the selected recipe

  // Function to handle opening the recipe details modal
  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Function to handle closing the recipe details modal
  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };

  const handleFilterChange = (selectedCategory) => {
    // Implement filtering logic based on selectedCategory
    console.log("Selected Category:", selectedCategory);
    // Update your state with the filtered data
  };

  return (
    <div className="home-page">
      <DropdownFilter onFilterChange={handleFilterChange} />
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onCardClick={openRecipeModal}
          />
        ))}
      </div>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={closeRecipeModal} />
      )}
    </div>
  );
};

export default HomePage;
