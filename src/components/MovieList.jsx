import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, lastMovieRef }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => {
        if (index === movies.length - 1) {
          return <MovieCard key={movie.id} movie={movie} ref={lastMovieRef} />;
        }
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </div>
  );
};

export default MovieList;
