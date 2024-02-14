import React, { useState } from "react";
import { useRecipes } from "./RecipesContext";

const RecipeCard = ({ recipe, onCardClick }) => {
  const { deleteRecipe, likeRecipe } = useRecipes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({
    title: recipe.title,
    ingredients: recipe.ingredients,
    recipe: recipe.recipe,
    image_url: recipe.image_url,
    categories: recipe.categories, // Update to handle categories
  });

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(
    recipe.initialLikes || Math.floor(Math.random() * 100)
  );

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    likeRecipe(recipe.id);
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    try {
      await deleteRecipe(recipe.id);
      console.log("Recipe deleted successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleFormClick = (e) => {
    e.stopPropagation(); // This stops the form click from propagating up to the recipe card
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedRecipe = {
      id: recipe.id,
      title: editedRecipe.title,
      ingredients: editedRecipe.ingredients,
      recipe: editedRecipe.recipe,
      image_url: editedRecipe.image_url,
      categories: editedRecipe.categories, // Update to handle categories
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/recipes/${recipe.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecipe),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }

      console.log("Recipe edited successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing recipe:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({
      ...editedRecipe,
      [name]: value,
    });
  };

  return (
    <div className="recipe-card" onClick={() => onCardClick(recipe)}>
      <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
      <h3>{recipe.title}</h3>
      <p>Category: {recipe.categories.join(", ")}</p>{" "}
      {/* Update to handle categories */}
      {isEditing ? (
        <form onClick={handleFormClick} onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedRecipe.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={editedRecipe.ingredients}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipe">Recipe</label>
            <textarea
              id="recipe"
              name="recipe"
              value={editedRecipe.recipe}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image_url">Image URL</label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={editedRecipe.image_url}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="categories">Categories</label>
            <input
              type="text"
              id="categories"
              name="categories"
              value={editedRecipe.categories.join(", ")}
              onChange={(e) =>
                setEditedRecipe({
                  ...editedRecipe,
                  categories: e.target.value
                    .split(",")
                    .map((cat) => cat.trim()),
                })
              }
              required
            />
          </div>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="like-section">
          <button className="like-button" onClick={handleLikeClick}>
            {liked ? "♥" : "♡"}
          </button>
          <span className="like-count">{likes}</span>
        </div>
      )}
      <button className="edit-button" onClick={handleEditClick}>
        ✏️
      </button>
      <button className="delete-button" onClick={handleDeleteClick}>
        🗑️
      </button>
    </div>
  );
};

export default RecipeCard;
