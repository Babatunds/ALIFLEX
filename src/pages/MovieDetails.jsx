import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getMovieCredits, getMovieVideos } from "../utils/api";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailers, setTrailers] = useState([]);
  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const [movieData, creditsData, videosData] = await Promise.all([
        getMovieDetails(id),
        getMovieCredits(id),
        getMovieVideos(id)
      ]);
      setMovie(movieData);
  setCast(creditsData.cast ? creditsData.cast.slice(0, 10) : []);
  // Filter for YouTube trailers
  const ytTrailers = (videosData.results || []).filter(v => v.site === "YouTube" && v.type === "Trailer");
      setTrailers(ytTrailers);
      setLoading(false);
    }
    fetchDetails();
  }, [id]);

  if (loading) return <div className="movie-details-loading">Loading...</div>;
  if (!movie) return <div className="movie-details-error">Movie not found.</div>;

  return (
    <div className="movie-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>&larr; Back</button>
      <div className="movie-details-hero" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}} />
      <div className="movie-details-content">
        <img className="movie-details-poster" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} />
        <div className="movie-details-info">
          <h2>{movie.title} <span className="movie-details-year">({movie.release_date?.slice(0,4)})</span></h2>
          <div className="movie-details-rating">⭐ {movie.vote_average}</div>
          <p className="movie-details-overview">{movie.overview}</p>
          <div className="movie-details-meta">
            <span>Runtime: {movie.runtime} min</span>
            <span>Genres: {movie.genres?.map(g => g.name).join(", ")}</span>
            <span>Language: {movie.original_language?.toUpperCase()}</span>
            <span>Release: {movie.release_date}</span>
          </div>
          <div className="movie-details-trailers">
            <h3>Trailer{trailers.length > 1 ? "s" : ""}</h3>
            <div className="trailers-list">
              {trailers.length > 0 ? (
                trailers.map(trailer => (
                  <div key={trailer.id} className="trailer-embed">
                    <iframe
                      width="420"
                      height="236"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title={trailer.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ))
              ) : (
                <div className="no-trailer">No trailer available for this movie.</div>
              )}
            </div>
          </div>
          {cast.length > 0 && (
            <div className="movie-details-cast">
              <h3>Cast</h3>
              <div className="cast-list">
                {cast.map(actor => (
                  <div className="cast-member" key={actor.cast_id || actor.id}>
                    <img
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/80x120?text=No+Image"}
                      alt={actor.name}
                    />
                    <div className="cast-name">{actor.name}</div>
                    <div className="cast-character">as {actor.character}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
