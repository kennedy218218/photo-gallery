import React from 'react';
import SearchBar from './SearchBar';

const Header = ({ searchQuery, onSearchChange, onSearch }) => (
  <header className="header">
    <h1>📸 Photo Gallery</h1>
    {/* Pass down the props to SearchBar component */}
    <SearchBar
      searchQuery={searchQuery}   // Renamed to match the prop from App.js
      onSearchChange={onSearchChange}
      onSearch={onSearch}
    />
  </header>
);

export default Header;




