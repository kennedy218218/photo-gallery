import React from 'react';


const PhotoDetails = ({ photo, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  if (!photo) return null;

  return (
    <div className="photo-details-overlay">
      <div className="photo-details-container">
        <button className="close-btn" onClick={onClose}>✖</button>
        <img className="photo-details-img" src={photo.urls.regular} alt={photo.alt_description || 'Photo'} />

        <div className="photo-info">
          <h2>{photo.description || photo.alt_description || "Untitled"}</h2>
          <p><strong>Photographer:</strong> {photo.user.name}</p>
          <p><strong>Likes:</strong> {photo.likes}</p>
          <a href={photo.links.download} target="_blank" rel="noopener noreferrer" className="download-btn">
            Download
          </a>
        </div>

        <div className="nav-buttons">
          {hasPrev && <button onClick={onPrev} className="nav-btn">← Prev</button>}
          {hasNext && <button onClick={onNext} className="nav-btn">Next →</button>}
        </div>
      </div>
    </div>
  );
};

export default PhotoDetails;








