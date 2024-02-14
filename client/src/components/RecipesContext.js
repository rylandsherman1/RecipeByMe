import React, { createContext, useState, useContext, useCallback } from "react";

const RecipesContext = createContext();

export const useRecipes = () => useContext(RecipesContext);

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/recipes");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  });

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/recipes/${recipeId}`,
        { method: "DELETE" }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const likeRecipe = (recipeId) => {
    setLikedRecipes((prevLikedRecipes) => {
      const isAlreadyLiked = prevLikedRecipes.find((id) => id === recipeId);
      if (isAlreadyLiked) {
        return prevLikedRecipes.filter((id) => id !== recipeId); // Unlike the recipe
      } else {
        return [...prevLikedRecipes, recipeId]; // Like the recipe
      }
    });
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        fetchRecipes,
        addRecipe,
        deleteRecipe,
        likeRecipe,
        likedRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
