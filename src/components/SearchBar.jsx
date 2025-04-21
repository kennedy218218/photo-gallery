import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="search-container">
      <input
        id="search-input"
        type="text"
        placeholder="Search  photos..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button id="search-btn" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;







