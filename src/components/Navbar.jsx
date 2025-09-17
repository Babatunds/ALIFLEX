


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies, getAnimationMovies } from "../utils/api";
import "./Navbar.css";

function Navbar() {
  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const searchBox = document.querySelector('.search-box');
      if (searchBox && !searchBox.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const [hideNav, setHideNav] = useState(false);
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 60) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searching, setSearching] = useState(false);


  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setResults([]);
    setShowDropdown(false);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchText(value);
    let data = { results: [] };
    setSearching(true);
    try {
      if (searchType === "movies" && value.length > 1) {
        data = await searchMovies(value);
      } else if (searchType === "animation" && value.length > 1) {
        data = await getAnimationMovies(1);
        data.results = data.results.filter(m => m.title.toLowerCase().includes(value.toLowerCase()));
      } else if (searchType === "crime" && value.length > 1) {
        data = await fetchCrimeMovies(value);
      } else if (searchType === "comedy" && value.length > 1) {
        data = await fetchGenreMovies(35, value);
      } else if (searchType === "romance" && value.length > 1) {
        data = await fetchGenreMovies(10749, value);
      } else if (searchType === "all" && value.length > 1) {
        data = await searchMovies(value);
      }
      setResults(data.results || []);
      setShowDropdown(true);
    } catch {
      setResults([]);
      setShowDropdown(false);
    }
    setSearching(false);
    if (value.length <= 1) {
      setResults([]);
      setShowDropdown(false);
    }
  };

  // Helper functions for genre-based search
  async function fetchGenreMovies(genreId, query) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=2e28c418c6a2d6dd17961bb0c1930925&with_genres=${genreId}`;
    const res = await fetch(url);
    const data = await res.json();
    data.results = data.results.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
    return data;
  }
  async function fetchCrimeMovies(query) {
    // Crime genre id is 80
    return fetchGenreMovies(80, query);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchType === "animation" && !searchText.trim()) {
      navigate("/animation");
      return;
    }
    if (searchType === "crime" && !searchText.trim()) {
      navigate("/crime");
      return;
    }
    if (searchType === "comedy" && !searchText.trim()) {
      navigate("/comedy");
      return;
    }
    if (searchType === "romance" && !searchText.trim()) {
      navigate("/romance");
      return;
    }
    setSearching(true);
    try {
      let data = { results: [] };
      if (searchType !== "all" && !searchText.trim()) {
        // Show all movies from the selected genre
        const genreMap = {
          crime: 80,
          animation: 16,
          comedy: 35,
          romance: 10749,
          movies: null,
          tv: null
        };
        if (genreMap[searchType]) {
          data = await fetchGenreMovies(genreMap[searchType], "");
        } else if (searchType === "movies") {
          // Show popular movies
          const url = `https://api.themoviedb.org/3/movie/popular?api_key=2e28c418c6a2d6dd17961bb0c1930925`;
          const res = await fetch(url);
          data = await res.json();
        }
        setResults(data.results || []);
        setShowDropdown(true);
      } else if (searchType === "all" && !searchText.trim()) {
        // Show all genres
        const genreList = [80, 16, 35, 10749];
        let allResults = [];
        for (const genreId of genreList) {
          const genreData = await fetchGenreMovies(genreId, "");
          allResults = allResults.concat(genreData.results || []);
        }
        setResults(allResults);
        setShowDropdown(true);
      }
    } catch {
      setResults([]);
      setShowDropdown(false);
    }
    setSearching(false);
  };

  return (
    <nav className={`navbar${hideNav ? " navbar--hidden" : ""}`}>
      <div className="logo">ALIFLEX</div>
  {/* Nav links removed as requested */}
      <form className="search-box" onSubmit={handleSubmit} autoComplete="off">
        <select className="search-dropdown" value={searchType} onChange={handleSearchTypeChange}>
          <option value="all">All</option>
          <option value="movies">Movies</option>
          <option value="tv">TV Shows</option>
          <option value="crime">Crime</option>
          <option value="animation">Animation</option>
          <option value="comedy">Comedy</option>
          <option value="romance">Romance</option>
        </select>
        <input
          type="text"
          className="search-input"
          placeholder="search here"
          value={searchText}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-btn">
          <span className="search-icon">🔍</span>
        </button>
  {showDropdown && (
          <div className="search-dropdown-list">
            {searching ? (
              <div className="search-dropdown-item">Searching...</div>
            ) : results.length === 0 ? (
              <div className="search-dropdown-item">No results found.</div>
            ) : (
              results.slice(0, 6).map((movie) => (
                <div
                  key={movie.id}
                  className="search-dropdown-item"
                  onClick={() => {
                    setShowDropdown(false);
                    setSearchText("");
                    navigate(`/movie/${movie.id}`);
                  }}
                  tabIndex={0}
                  role="button"
                  style={{cursor: "pointer"}}
                >
                  {movie.title}
                </div>
              ))
            )}
          </div>
        )}
      </form>
    {/* Hamburger removed as requested */}
    </nav>
  );
}

export default Navbar;
