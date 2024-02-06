import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Assuming your root element has the ID 'root'

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
          <img src={recipe.image_url} alt={recipe.title} />
          <p>Ingredients: {recipe.ingredients}</p>
          <p>Recipe: {recipe.recipe}</p>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </Modal>
  );
};

export default RecipeModal;
