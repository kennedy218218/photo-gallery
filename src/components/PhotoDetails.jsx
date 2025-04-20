import React from 'react';

const PhotoDetails = ({ photo, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  const { urls, user, alt_description, description } = photo;

  return (
    <div className="photo-details-overlay">
      <div className="photo-details">
        <button className="close-btn" onClick={onClose}>✖</button>

        {hasPrev && <button className="nav-btn prev-btn" onClick={onPrev}>←</button>}
        {hasNext && <button className="nav-btn next-btn" onClick={onNext}>→</button>}

        <img src={urls.regular} alt={alt_description || "Photo"} />
        <h2>{alt_description || "Untitled Photo"}</h2>
        <p><strong>Photographer:</strong> {user.name}</p>
        {description && <p><em>{description}</em></p>}
      </div>
    </div>
  );
};

export default PhotoDetails;






