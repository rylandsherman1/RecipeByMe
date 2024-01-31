import React, { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [liked, setLiked] = useState(false);
  // Initialize likes with a random value or a value from the recipe prop
  const [likes, setLikes] = useState(
    recipe.initialLikes || Math.floor(Math.random() * 100)
  );

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent the card click event
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1); // Increment or decrement likes based on whether it was previously liked
  };

  const handleCardClick = () => {
    console.log("Opening detailed view for recipe:", recipe);
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      {/* Like section with flex container */}
      <div className="like-section">
        <button className="like-button" onClick={handleLikeClick}>
          {liked ? "♥" : "♡"}
        </button>
        <span className="like-count">{likes}</span>
      </div>
    </div>
  );
};

export default RecipeCard;
