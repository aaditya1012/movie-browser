import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <p>Movie not found!</p>;
  }

  const { title, overview, vote_average, release_date, poster_path, genres } = movie;

  return (
    <div className="movie-details-card">
      <div className="card-content">
        <div className="poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className="poster-image"
          />
        </div>
        <div className="details">
          <h1 className="title">{title}</h1>
          <p className="overview">{overview}</p>
          <div className="info">
            <p>
              <strong>Rating:</strong> {vote_average}/10
            </p>
            <p>
              <strong>Genres:</strong> {genres?.map((genre) => genre.name).join(", ") || "N/A"}
            </p>
            <p>
              <strong>Release Year:</strong> {new Date(release_date).getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
