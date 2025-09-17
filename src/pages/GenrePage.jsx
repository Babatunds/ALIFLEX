import React, { useEffect, useState } from "react";
import Browse from "../components/Browse";

// Helper to fetch movies by genre
async function fetchGenreMovies(genreId) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=2e28c418c6a2d6dd17961bb0c1930925&with_genres=${genreId}`;
  const res = await fetch(url);
  return res.json();
}

export default function GenrePage({ genreId, title }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchGenreMovies(genreId).then(data => {
      setMovies(data.results || []);
    });
  }, [genreId]);
  return (
    <div className="section-card" style={{marginTop: 32, minHeight: 340}}>
      <h3 style={{ color: '#fff', marginLeft: 8, fontWeight: 600, fontSize: '1.4rem' }}>
        {title} Movies
      </h3>
  <Browse category={null} title={null} movies={movies} layout="grid" />
    </div>
  );
}
