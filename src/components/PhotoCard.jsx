import React from 'react';

const PhotoCard = ({ photo, onClick }) => (
  <div className="photo-card" onClick={onClick}>
    <img src={photo.urls.small} alt={photo.description} />
  </div>
);

export default PhotoCard;






