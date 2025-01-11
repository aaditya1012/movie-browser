import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
 
  const fetchData = (value) =>{
      fetch("https")
  }

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredMovies(movies); // Reset to all movies if query is empty
    } else {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  };

  return (
    <div className="input-wrapper">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input className="search-input" placeholder="Serach for Movies..." />
    </div>
  );
};

export default SearchBar;
