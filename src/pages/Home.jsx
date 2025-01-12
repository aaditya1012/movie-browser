import React, { useState, useEffect, useRef } from 'react';
import MovieList from '../components/MovieList';
import FilterModal from '../components/FilterModal';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    minYear: 1900,
    maxYear: new Date().getFullYear(),
    genre: '',
    rating: [0, 10],
  });
  const [page, setPage] = useState(1); // Page number for infinite scrolling
  const [loading, setLoading] = useState(false); // Loading state for infinite scrolling
  const [hasMore, setHasMore] = useState(true); // To track if more movies are available
  const observer = useRef(); // Ref for observing the last movie card

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useEffect(() => {
    applyFilters(filters);
  }, [filters, movies]);

  const fetchMovies = async (pageNumber) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY; // Replace with your actual TMDB API key
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNumber}`;

    try {
      setLoading(true);
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const data = await res.json();

      // Avoid duplicates when updating movies
      const newMovies = data.results.filter(
        (movie) => !movies.some((existing) => existing.id === movie.id)
      );

      setMovies((prev) => [...prev, ...newMovies]);
      setFilteredMovies((prev) => [...prev, ...newMovies]);

      if (data.page >= data.total_pages) {
        setHasMore(false); // No more movies to load
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = ({ minYear, maxYear, genre, rating }) => {
    const filtered = movies.filter((movie) => {
      const releaseYear = parseInt(movie.release_date.split('-')[0], 10);
      return (
        releaseYear >= minYear &&
        releaseYear <= maxYear &&
        (genre ? movie.genre_ids.includes(genre) : true) &&
        movie.vote_average >= rating[0] &&
        movie.vote_average <= rating[1]
      );
    });
    setFilteredMovies(filtered);
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const lastMovieRef = (node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div>
      <header>
        <button onClick={toggleFilterModal}>Show Filters</button>
      </header>

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          applyFilters={setFilters}
          closeModal={toggleFilterModal}
        />
      )}

      {/* Movie List */}
      <MovieList movies={filteredMovies} lastMovieRef={lastMovieRef} />

      {/* Loading Spinner */}
      {loading && <div className="spinner">Loading...</div>}
    </div>
  );
};

export default Home;
