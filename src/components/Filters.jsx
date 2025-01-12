import React, { useState } from 'react';

const Filters = ({ applyFilters }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

  const [minYear, setMinYear] = useState(startYear);
  const [maxYear, setMaxYear] = useState(currentYear);
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState([0, 10]);

  // Handle apply filter action
  const handleApplyFilters = () => {
    applyFilters({ minYear, maxYear, genre, rating });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Filters</h2>

        {/* Year Range Dropdowns */}
        <div className="filter-group">
          <label htmlFor="minYear">Start Year</label>
          <select
            id="minYear"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="maxYear">End Year</label>
          <select
            id="maxYear"
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Other filter elements (Genre, Rating, etc.) can remain as they were */}

        <button onClick={handleApplyFilters}>Apply Filters</button>
      </div>
    </div>
  );
};

export default Filters;
