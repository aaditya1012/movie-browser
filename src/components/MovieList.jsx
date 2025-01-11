import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`
        );
        const data = await response.json();

        if (data.results.length === 0) {
          setHasMore(false);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }

      setLoading(false);
    };

    fetchMovies();
  }, [currentPage]);

  // Save favorites to localStorage whenever the favorites list changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Handle favorite toggle
  const handleFavorite = (movie, isFavorite) => {
    setFavorites((prevFavorites) => {
      if (isFavorite) {
        return [...prevFavorites, movie];
      } else {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      }
    });
  };

  return (
    <div>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
            onFavorite={handleFavorite}
          />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more movies to load.</p>}
    </div>
  );
};

export default MovieList;
