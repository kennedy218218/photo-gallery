import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PhotoCard from './components/PhotoCard';
import PhotoDetails from './components/PhotoDetails';
import './App.css';

// Unsplash API Access Key
const ACCESS_KEY = "ro8RqJGTkP3APDUm2ic-O3WIkO7rar5ToMTlrg02qU4";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false); // tracks if in search mode

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

  // Initial/random photo fetch
  useEffect(() => {
    fetchPhotos('', 1); // Load random photos initially
  }, []);

  // Fetch when page is updated (for "Load More" functionality)
  useEffect(() => {
    if (page > 1) {
      fetchPhotos(searchQuery, page);
    }
  }, [page]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    setPage(1);
    setIsSearchMode(searchQuery.trim() !== '');
    fetchPhotos(searchQuery, 1);
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

























