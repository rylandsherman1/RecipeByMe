import React, { useState } from "react";
import { useRecipes } from "./RecipesContext"; // Adjust the path if necessary

const SubmitRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    recipe: "",
    image: "", // Changed from `image_url` to `image` to match form state
  });

  const { addRecipe } = useRecipes();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove the user_id from recipeData for testing purposes
    const recipeData = {
      ...formData,
    };

    console.log("Submitting recipe:", recipeData); // Debugging

    try {
      const response = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error details from response
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }

      const newRecipe = await response.json();
      addRecipe(newRecipe);

      setFormData({ title: "", ingredients: "", recipe: "", image: "" }); // Reset form
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  return (
    <div className="submit-recipe">
      <h2>Submit a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipe">Recipe</label>
          <textarea
            id="recipe"
            name="recipe"
            value={formData.recipe}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default SubmitRecipe;
