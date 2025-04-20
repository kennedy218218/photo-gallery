// src/components/PhotoCard.js
import React from 'react';

const PhotoCard = ({ photo, onClick }) => {
  const { urls, alt_description } = photo;

  return (
    <div className="photo-card" onClick={onClick}>
      <img src={urls.small} alt={alt_description || "Photo"} />
      <h3>{alt_description || "Untitled Photo"}</h3>
    </div>
  );
};

export default PhotoCard;





