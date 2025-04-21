import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PhotoCard from './components/PhotoCard';
import PhotoDetails from './components/PhotoDetails';
import CategoryBar from './components/CategoryBar';
import './App.css';

const ACCESS_KEY = "ro8RqJGTkP3APDUm2ic-O3WIkO7rar5ToMTlrg02qU4";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Nature'); // default category

  const fetchPhotos = async (query = '', pageNum = 1) => {
    setIsLoading(true);
    try {
      const endpoint = query
        ? `https://api.unsplash.com/search/photos?query=${query}&page=${pageNum}&per_page=12&client_id=${ACCESS_KEY}`
        : `https://api.unsplash.com/photos?page=${pageNum}&per_page=12&client_id=${ACCESS_KEY}`;

      const response = await fetch(endpoint);
      const data = await response.json();
      const results = query ? data.results : data;

      if (pageNum === 1) {
        setPhotos(results);
      } else {
        setPhotos((prev) => [...prev, ...results]);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load default category on first render
  useEffect(() => {
    fetchPhotos('Nature', 1);
    setIsSearchMode(false);
    setActiveCategory('Nature');
  }, [searchQuery,]);

  // Load more photos when page changes
  useEffect(() => {
    if (page > 1) {
      fetchPhotos(searchQuery || activeCategory, page);
    }
  }, [page]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setPage(1);
      setIsSearchMode(true);
      fetchPhotos(searchQuery, 1);
    }
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSearchQuery('');
    setPage(1);
    setIsSearchMode(false);
    fetchPhotos(category, 1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handlePhotoClick = (photo, index) => {
    setSelectedPhoto(photo);
    setSelectedPhotoIndex(index);
  };

  const handleCloseDetails = () => {
    setSelectedPhoto(null);
    setSelectedPhotoIndex(null);
  };

  const handleNext = () => {
    const nextIndex = selectedPhotoIndex + 1;
    if (nextIndex < photos.length) {
      setSelectedPhoto(photos[nextIndex]);
      setSelectedPhotoIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    const prevIndex = selectedPhotoIndex - 1;
    if (prevIndex >= 0) {
      setSelectedPhoto(photos[prevIndex]);
      setSelectedPhotoIndex(prevIndex);
    }
  };

  return (
    <div className="App">
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />

      <CategoryBar onSelectCategory={handleCategorySelect} />

      {selectedPhoto && (
        <PhotoDetails
          photo={selectedPhoto}
          onClose={handleCloseDetails}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedPhotoIndex < photos.length - 1}
          hasPrev={selectedPhotoIndex > 0}
        />
      )}

      <div className="photo-grid">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClick={() => handlePhotoClick(photo, index)}
            />
          ))
        ) : (
          <p className="no-results">
            {isSearchMode ? "No results found for your search." : "No photos available."}
          </p>
        )}
      </div>

      {photos.length > 0 && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;


























