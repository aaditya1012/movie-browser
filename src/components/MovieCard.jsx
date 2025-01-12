import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date } = movie;
  const [isFavorite, setIsFavorite] = useState(false);

  // Load the initial favorite state from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some((fav) => fav.id === id));
  }, [id]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      style={{
        width: '230px',
        position: 'relative',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
        alt={title}
        style={{ borderRadius: '8px', width: '100%', marginBottom: '10px' }}
      />
      <h3
        style={{
          fontFamily:'cursive',
          fontSize: '16px',
          margin: '10px 0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={title}
      >
        {title}
      </h3>
      <p style={{ fontFamily:'cursive',fontSize: '14px', color: '#666', marginBottom: '10px' }}>
        {release_date ? new Date(release_date).getFullYear() : 'N/A'}
      </p>
      <FontAwesomeIcon
        className='favorite-btn'
        icon={faStar}
        size="lg"
        onClick={handleFavoriteToggle}
        style={{
          color: isFavorite ? 'gold' : 'gray',
        }}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      />
    </div>
  );
};

export default MovieCard;
