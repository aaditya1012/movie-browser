import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie, isFavorite, onFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavorite = () => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    onFavorite(movie, newFavoriteState);
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p>Release Year: {new Date(movie.release_date).getFullYear()}</p>
      </div>
      <div>
        <button className="favorite-button" onClick={toggleFavorite}>
          <FontAwesomeIcon icon={faStar} color={favorite ? "gold" : "gray"} />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
