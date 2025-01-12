import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import SearchBar from  '../components/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // To store unique movie IDs
  const movieSet = new Set();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
      );
      const data = await response.json();

      // Filter out duplicate movies using the Set to check IDs
      const newMovies = data.results.filter((movie) => {
        if (!movieSet.has(movie.id)) {
          movieSet.add(movie.id); // Add movie ID to the Set
          return true;  // Include movie in the new list
        }
        return false;  // Exclude duplicate movie
      });

      // Add unique movies to the state
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setFilteredMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setIsLoading(false);
    };

    fetchMovies();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  return (
    <div>
      {/* Search Bar */}
      <div className="search-filter-container">
        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Movie List */}
      <MovieList movies={filteredMovies} />

      {/* Loading Spinner */}
      {isLoading && <div className="loading-spinner"></div>}
    </div>
  );
};

export default Home;
