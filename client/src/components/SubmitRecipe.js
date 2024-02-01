import React, { useState } from "react";

const SubmitRecipe = () => {
  // State to manage form input fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cookingTime: "",
    difficulty: "",
    ingredients: [],
    categories: [],
    // Add more fields as needed
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the formData to your backend for recipe creation
    console.log(formData);
    // Reset the form fields or navigate to a different page
    // depending on your application logic
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
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <input
            type="text"
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add fields for ingredients and categories here */}
        <div className="form-group">
          <button type="submit">Submit Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default SubmitRecipe;
