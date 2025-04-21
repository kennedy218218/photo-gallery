import React from 'react';


const categories = ['Nature', 'Technology', 'Animals', 'People', 'Food', 'Architecture', 'Travel', `Motor Bikes`, `Cards`, `Houses`, `TV's`, `Clothes`, `Shoes`, `jewels`];

const CategoryBar = ({ onSelectCategory }) => {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className="category-btn"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;


