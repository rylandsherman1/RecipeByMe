import React, { useState } from "react";

const DropdownFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Placeholder categories
  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange(e.target.value); // Propagate the selected category to the parent component
  };

  return (
    <div className="dropdown-filter">
      <select value={selectedCategory} onChange={handleChange}>
        <option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFilter;
