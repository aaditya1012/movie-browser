import React, { useState, useEffect } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [value, setValue] = useState(searchQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce Effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(value); // Update debounced query after delay
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timeoutId); // Clear timeout on component unmount or value change
  }, [value]); // Only run this effect when the value changes

  // Update the search query state after debounce
  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  const handleInputChange = (e) => {
    setValue(e.target.value); // Update local value
  };

  return (
    <>
      <FontAwesomeIcon style={{ padding: "9px" }} icon={faMagnifyingGlass} />
      <input
        type="text"
        placeholder="Search for a movie..."
        value={value}
        onChange={handleInputChange} // Call the handleInputChange to update local value
        style={{ padding: "10px", width: "95%" }}
      />
    </>
  );
};

export default SearchBar;
