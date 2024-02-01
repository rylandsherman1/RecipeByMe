import React, { useState } from "react";
import SubmitRecipe from "./SubmitRecipe"; // Assuming this is the correct path

const NewRecipeButton = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="new-recipe-container">
      <button
        className="new-recipe-button"
        onClick={() => setShowForm(!showForm)}
      >
        +
      </button>
      {showForm && (
        <div className="new-recipe-form">
          <SubmitRecipe />
        </div>
      )}
    </div>
  );
};

export default NewRecipeButton;
