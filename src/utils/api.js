// Get movie videos (trailers, teasers, clips) by ID
export function getMovieVideos(movieId) {
  return fetchFromTMDb(`/movie/${movieId}/videos`);
}
// Fetch animation and anime movies (genre id 16)
export function getAnimationMovies(page = 1) {
  // TMDb does not have a separate "Anime" genre, but most anime movies are under Animation (id 16) and/or have "Japan" as origin_country.
  // This fetches all Animation movies; you can further filter for anime in the UI if needed.
  return fetchFromTMDb('/discover/movie', { with_genres: 16, page });
}
// TMDb API helper functions for Aliflex
// Replace 'YOUR_TMDB_API_KEY' with your actual TMDb API key

const API_KEY = '2e28c418c6a2d6dd17961bb0c1930925';
const BASE_URL = 'https://api.themoviedb.org/3';

// Helper to fetch data from TMDb
async function fetchFromTMDb(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch from TMDb');
  return res.json();
}

// Fetch trending movies
export function getTrendingMovies(page = 1) {
  return fetchFromTMDb('/trending/movie/week', { page });
}

// Fetch top rated movies
export function getTopRatedMovies(page = 1) {
  return fetchFromTMDb('/movie/top_rated', { page });
}

// Fetch upcoming movies
export function getUpcomingMovies(page = 1) {
  return fetchFromTMDb('/movie/upcoming', { page });
}

// Search movies by title
export function searchMovies(query, page = 1) {
  return fetchFromTMDb('/search/movie', { query, page });
}

// Get movie details by ID
export function getMovieDetails(movieId) {
  return fetchFromTMDb(`/movie/${movieId}`);
}

// Get movie credits (cast & crew) by ID
export function getMovieCredits(movieId) {
  return fetchFromTMDb(`/movie/${movieId}/credits`);
}
