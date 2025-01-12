import React, { useState, useEffect } from 'react';

const FilterModal = ({ filters, setFilters, applyFilters }) => {
  const [genres, setGenres] = useState([]);

  // Fetch genres from the TMDB API
  useEffect(() => {
    const fetchGenres = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  const years = Array.from({ length: 50 }, (_, i) => 2023 - i); // Generate last 50 years

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Filters</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Genre:</label>
        <select
  value={filters.genre || ''}
  onChange={(e) => handleFilterChange('genre', e.target.value)}
>
  <option value="">All</option>
  {genres.map((genre) => (
    <option key={genre.id} value={genre.id}>
      {genre.name}
    </option>
  ))}
</select>

      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Release Year (From):</label>
        <select
          value={filters.startYear || ''}
          onChange={(e) => handleFilterChange('startYear', e.target.value)}
        >
          <option value="">Any</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Release Year (To):</label>
        <select
          value={filters.endYear || ''}
          onChange={(e) => handleFilterChange('endYear', e.target.value)}
        >
          <option value="">Any</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Rating:</label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={filters.rating || 0}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
        />
        <span>{filters.rating || '0'}</span>
      </div>

      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
};

export default FilterModal;
