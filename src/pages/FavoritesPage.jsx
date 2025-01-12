import React from 'react';

const FavoritesPage = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontFamily:'cursive'}}>
        Your Favorite Movies
      </h1>
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
          No favorites added yet!
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          {favorites.map((movie) => (
            <div
              key={movie.id}
              style={{
                width: '200px',
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
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
                style={{
                  borderRadius: '8px',
                  width: '100%',
                  marginBottom: '10px',
                }}
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
                title={movie.title}
              >
                {movie.title}
              </h3>
              <p style={{ fontFamily:'cursive',fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
