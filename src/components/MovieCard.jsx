import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)} tabIndex={0} style={{cursor:'pointer'}}>
      <div
        className="movie-img"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }}
      >
        <span className="rating-badge">{movie.vote_average}</span>
      </div>
      <div className="movie-info">
        <h4>{movie.title}</h4>
        <p>{movie.release_date?.slice(0, 4)}</p>
      </div>
    </div>
  );
}
