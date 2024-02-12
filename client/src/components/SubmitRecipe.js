import React, { useState } from "react";
import { useRecipes } from "./RecipesContext"; // Use this for recipes

const SubmitRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    recipe: "",
    image_url: "",
    category: "", // Added category to the form data state
  });

  const { addRecipe } = useRecipes();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    if (userId && authToken) {
      const recipeData = { ...formData, userId };

      try {
        const response = await fetch("http://localhost:5000/api/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
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
        setFormData({
          title: "",
          ingredients: "",
          recipe: "",
          image_url: "",
          category: "",
        }); // Reset form including category
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
          <label htmlFor="image_url">Image URL</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Appetizers">Appetizers</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit">Submit Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default SubmitRecipe;
