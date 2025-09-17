
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const backgrounds = [
  "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
  "https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
  "https://image.tmdb.org/t/p/original/9OYu6oDLIidSOocW3JTGtd2Oyqy.jpg"
];

export default function Landing() {
  // Removed unused authentication state variables
  const [bg, setBg] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setBg((prev) => (prev + 1) % backgrounds.length);
        setFade(true);
      }, 600);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-bg">
  {/* Auth buttons removed as requested */}
      <div
        className={`landing-bg-img${fade ? " fade-in" : " fade-out"}`}
        style={{ backgroundImage: `url(${backgrounds[bg]})` }}
      />
      <div className="landing-glass-overlay">
  {/* Auth modals removed as requested */}
        <h1 className="landing-logo">
          <span className="aliflex-logo-animated">ALIFLEX</span>
          <span className="landing-tagline">Movie Discovery</span>
        </h1>
        <p className="landing-desc">Unlimited movies, trending now, and more. Dive into a world of cinema with a single click.</p>
        <button className="play-btn-glow" onClick={() => navigate("/home")}>Search Now</button>
        <div className="landing-features">
          <div className="feature-card">
            <span className="feature-icon">🎬</span>
            <div className="feature-title">Watch Trailers</div>
            <div className="feature-desc">Preview movies before you watch.</div>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <div className="feature-title">Top Rated</div>
            <div className="feature-desc">Discover trending and top-rated films.</div>
          </div>
          <div className="feature-card">
            <span className="feature-icon">�</span>
            <div className="feature-title">Advanced Search</div>
            <div className="feature-desc">Find movies by genre, rating, and more.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
