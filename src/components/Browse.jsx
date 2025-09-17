import React, { useEffect, useState } from "react";
import { getTrendingMovies, getTopRatedMovies, getUpcomingMovies, getAnimationMovies } from "../utils/api";
// Romance genre id is 10749
function getRomanceMovies(page = 1) {
  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2e28c418c6a2d6dd17961bb0c1930925&with_genres=10749&page=${page}`)
    .then(res => res.json());
}
import MovieCard from "./MovieCard";
import "./Browse.css";

const apiMap = {
  trending: getTrendingMovies,
  top_rated: getTopRatedMovies,
  upcoming: getUpcomingMovies,
  animation: getAnimationMovies,
  romance: getRomanceMovies,
};

export default function Browse({ category, title, movies: propMovies, layout = "grid" }) {
  const [movies, setMovies] = useState(propMovies || []);

  useEffect(() => {
    if (propMovies) {
      setMovies(propMovies);
      return;
    }
    if (category && apiMap[category]) {
      apiMap[category]().then(data => {
        setMovies(data.results || []);
      });
    }
  }, [category, propMovies]);

  if (!movies || movies.length === 0) return null;

  return (
    <section className="browse-section" id={category}>
      {title && <h3>{title}</h3>}
      <div className={`movie-list movie-list--${layout}`}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
