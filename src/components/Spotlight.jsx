import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { getTrendingMovies } from "../utils/api";
import "./Spotlight.css";

export default function Spotlight() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTrendingMovies().then(data => {
      console.log('TMDb trending movies response:', data);
      if (data.results && data.results.length > 0) {
        setMovies(data.results.slice(0, 8));
      }
    });
  }, []);

  if (!movies.length) return <div className="spotlight">Loading...</div>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    fade: true,
    cssEase: "ease-in-out"
  };

  return (
    <section className="spotlight">
      <Slider {...sliderSettings}>
        {movies.map(movie => (
          <div
            key={movie.id}
            className="spotlight-slide"
            style={{height: '320px', display: 'flex', alignItems: 'flex-end', cursor: 'pointer'}}
            onClick={() => navigate(`/movie/${movie.id}`)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${movie.title}`}
          >
            {movie.backdrop_path ? (
              <div className="spotlight-bg" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}} />
            ) : (
              <div className="spotlight-bg" style={{background: '#222'}} />
            )}
            <div className="spotlight-content">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <span className="rating-badge">⭐ {movie.vote_average}</span>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
