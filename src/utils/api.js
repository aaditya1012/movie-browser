import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query, filters, page = 1) => {
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`;
  
  if (query) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
  }

  if (filters.genre) {
    url += `&with_genres=${filters.genre}`;
  }

  if (filters.releaseYearRange) {
    url += `&primary_release_date.gte=${filters.releaseYearRange[0]}-01-01&primary_release_date.lte=${filters.releaseYearRange[1]}-12-31`;
  }

  if (filters.ratingRange) {
    url += `&vote_average.gte=${filters.ratingRange[0]}&vote_average.lte=${filters.ratingRange[1]}`;
  }

  const response = await axios.get(url);
  return response.data;
};

export const fetchGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return response.data;
};
