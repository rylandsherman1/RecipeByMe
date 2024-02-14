import React, { useState } from "react";

const DropdownFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Updated categories
  const categories = ["Breakfast", "Appetizers", "Lunch", "Dinner", "Dessert"];

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange(e.target.value); // Propagate the selected category to the parent component
  };

  return (
    <div className="dropdown-filter">
      <select value={selectedCategory} onChange={handleChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFilter;
