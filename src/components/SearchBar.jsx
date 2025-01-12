import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <input
      type="text"
      placeholder="Search for a movie..."
      value={value}
      onChange={handleInputChange}
      style={{ padding: '8px', width: '100%' }}
    />
  );
};

export default SearchBar;
