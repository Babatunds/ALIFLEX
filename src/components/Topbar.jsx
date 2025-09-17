

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../utils/api";

export default function Topbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef();
  const navigate = useNavigate();


  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (value.trim().length === 0) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await searchMovies(value);
        setSuggestions(data.results.slice(0, 6));
        setShowDropdown(true);
      } catch {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 350);
  };


  const handleSuggestionClick = (movie) => {
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    navigate(`/movie/${movie.id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    setSuggestions([]);
    if (onSearch && query.trim()) onSearch(query);
  };

  return (
    <nav className="topbar">
      <div className="topbar-left">
        <div className="logo-text" onClick={() => navigate("/home")}> 
          <span className="logo-icon">🎬</span>
          ALIFLEX
        </div>
      </div>
      <div className="topbar-center">
        <form className="search-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="search-input-wrapper">
            <input
              id="search-movies"
              name="search-movies"
              type="text"
              placeholder="Search for movies, shows..."
              value={query}
              onChange={handleInput}
              onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
          </div>
          <button type="submit" className="search-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          {showDropdown && suggestions.length > 0 && (
            <ul className="search-dropdown">
              {suggestions.map(movie => (
                <li key={movie.id} onMouseDown={() => handleSuggestionClick(movie)}>
                  <div className="suggestion-poster">
                    {movie.poster_path ? (
                      <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} />
                    ) : (
                      <div className="no-poster">🎬</div>
                    )}
                  </div>
                  <div className="suggestion-info">
                    <span className="suggestion-title">{movie.title}</span>
                    {movie.release_date && (
                      <span className="suggestion-year">({movie.release_date.slice(0,4)})</span>
                    )}
                    {movie.vote_average > 0 && (
                      <span className="suggestion-rating">⭐ {movie.vote_average.toFixed(1)}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
  {/* Removed nav links for Trending, Top Rated, and New to Aliflex */}
    </nav>
  );
}
