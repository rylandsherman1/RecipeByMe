import React from "react";

const RecipeModal = ({ recipe, onClose }) => {
  return (
    <div className="recipe-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />
        <p>Description: {recipe.description}</p>
        <p>Cooking Time: {recipe.cookingTime} minutes</p>
        <p>Difficulty: {recipe.difficulty}</p>
        {/* Add more recipe details here */}
      </div>
    </div>
  );
};

export default RecipeModal;
