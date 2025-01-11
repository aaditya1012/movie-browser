import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { fetchMovies } from '../services/movieApi';
import Header from '../components/Header';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === '') {
        // Optionally, fetch popular movies when there's no search query
        const popularMovies = await fetchMovies('popular');
        setMovies(popularMovies.results);
      } else {
        const searchResults = await fetchMovies(query);
        setMovies(searchResults.results);
      }
    };
    fetchData();
  }, [query]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleFavorite = (movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Check if movie is already in favorites
    if (!favorites.find((fav) => fav.id === movie.id)) {
      localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
    }
  };

  return (
    <div>
      <Header/>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} onFavorite={handleFavorite} />
    </div>
  );
};

export default Home;
