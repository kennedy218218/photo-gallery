import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PhotoCard from './components/PhotoCard';
import PhotoDetails from './components/PhotoDetails';
import './App.css';

const ACCESS_KEY = "ro8RqJGTkP3APDUm2ic-O3WIkO7rar5ToMTlrg02qU4";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('nature');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Function to fetch photos based on the search query and page number
  const fetchPhotos = async (query = 'nature', pageNum = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&page=${pageNum}&per_page=30&client_id=${ACCESS_KEY}`
      );
      const data = await response.json();
      if (pageNum === 1) {
        setPhotos(data.results); // reset photos on new search
      } else {
        setPhotos((prev) => [...prev, ...data.results]); // append new photos
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      setPhotos([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect hook to fetch photos whenever search query or page changes
  useEffect(() => {
    fetchPhotos(searchQuery, page);
  }, [searchQuery, page]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1); // reset page when search query changes
  };

  const handleSearch = () => {
    setPage(1); // reset page to 1 when initiating search
    fetchPhotos(searchQuery, 1);
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

  const handleLoadMore = () => {
    setPage(page + 1); // increment page number to load more photos
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
        {Array.isArray(photos) && photos.length > 0 ? (
          photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClick={() => handlePhotoClick(photo, index)}
            />
          ))
        ) : (
          <p>No photos found.</p>
        )}
      </div>

      <div className="load-more-container">
        <button className="load-more-btn" onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default App;























