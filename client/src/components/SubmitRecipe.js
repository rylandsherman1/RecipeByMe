import React, { useState } from "react";
import { useRecipes } from "./RecipesContext"; // Use this for recipes

const SubmitRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    recipe: "",
    image: "",
  });

  const { addRecipe } = useRecipes(); // Access addRecipe from RecipesContext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getCurrentUserId = () => {
    const userString = localStorage.getItem("user"); // Replace "user" with the actual key used to store user info
    if (userString) {
      const user = JSON.parse(userString);
      return user.id; // Ensure the ID field matches how it's stored within the user object
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // Directly retrieve the user ID
    const authToken = localStorage.getItem("authToken"); // Retrieve the authentication token

    if (userId && authToken) {
      const recipeData = { ...formData, userId };

      try {
        const response = await fetch("http://localhost:5000/api/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
          },
          body: JSON.stringify(recipeData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, ${errorText}`
          );
        }

        const newRecipe = await response.json();
        addRecipe(newRecipe);
        setFormData({ title: "", ingredients: "", recipe: "", image: "" });
      } catch (error) {
        console.error("Error submitting recipe:", error);
      }
    } else {
      console.error(
        "No current user information or authentication token available."
      );
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
