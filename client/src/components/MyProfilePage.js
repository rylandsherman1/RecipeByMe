import React, { useState } from "react";

const MyProfilePage = ({ isAuthenticated, userRecipes, likedRecipes }) => {
  const [userData, setUserData] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    // Add other user data fields here
  });

  // Function to handle changes in user data
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Function to save updated user data to the backend
  const saveUserData = () => {
    // Implement logic to save user data to the backend
    console.log("Saving user data:", userData);
    // Add POST request to save data
  };

  if (!isAuthenticated) {
    return (
      <div className="my-profile-page">
        <h2>My Profile</h2>
        <p>Please sign in or sign up to view your profile.</p>
        {/* Add sign in/sign up link or button here */}
      </div>
    );
  }

  return (
    <div className="my-profile-page">
      <h2>My Profile</h2>
      {/* User profile form */}
      {/* ... */}

      <section>
        <h3>My Recipes</h3>
        {/* Render user's own recipes here */}
        {/* This can be a list or grid of RecipeCard components */}
        {userRecipes.map((recipe) => (
          <div key={recipe.id}>{recipe.title}</div> // Replace with RecipeCard component if available
        ))}
      </section>

      <section>
        <h3>Recipes I Like</h3>
        {/* Render liked recipes here */}
        {likedRecipes.map((recipe) => (
          <div key={recipe.id}>{recipe.title}</div> // Replace with RecipeCard component if available
        ))}
      </section>

      {/* Add other profile sections here */}
    </div>
  );
};

export default MyProfilePage;
