import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the app element to prevent screen readers from reading background content

const RecipeModal = ({ isOpen, recipe, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Recipe Details"
      className="recipe-modal-content"
      overlayClassName="recipe-modal-overlay"
    >
      {recipe && (
        <div>
          <h3>{recipe.title}</h3>
          <p>
            <strong>Category:</strong> {recipe.category}
          </p>{" "}
          {/* Display the recipe's category */}
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients}
          </p>
          <p>
            <strong>Recipe:</strong> {recipe.recipe}
          </p>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </Modal>
  );
};

export default RecipeModal;
