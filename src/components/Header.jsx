import React from 'react';
import SearchBar from './SearchBar';

const Header = ({ searchQuery, onSearchChange, onSearch }) => (
  <header className="header">
    <h1>📸 Photo Gallery</h1>
    <SearchBar
      searchTerm={searchQuery}
      onSearchChange={onSearchChange}
      onSearch={onSearch}
    />
  </header>
);

export default Header;



