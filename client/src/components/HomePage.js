import React, { useEffect, useState, useMemo } from "react"; // Import useMemo
import DropdownFilter from "./DropdownFilter";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import { useRecipes } from "./RecipesContext";

const HomePage = () => {
  const { recipes, fetchRecipes } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // State to track selected category

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // useMemo hook to memoize filtered recipes based on selectedCategory and recipes
  const filteredRecipes = useMemo(() => {
    return selectedCategory
      ? recipes.filter((recipe) => recipe.categories.includes(selectedCategory))
      : recipes;
  }, [selectedCategory, recipes]);

  const openRecipeModal = (recipe) => setSelectedRecipe(recipe);
  const closeRecipeModal = () => setSelectedRecipe(null);

  // Update handleFilterChange to set selectedCategory
  const handleFilterChange = (category) => {
    console.log("Selected category:", category);
    setSelectedCategory(category);
  };

  return (
    <div className="home-page">
      <DropdownFilter onFilterChange={handleFilterChange} />
      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
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
