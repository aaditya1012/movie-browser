import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h2>Your Favorites</h2>
      <MovieList movies={favorites} />
    </div>
  );
};

export default Favorites;
