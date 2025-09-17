import React, { useEffect, useState } from "react";
import "./HomeHero.css";

const heroBackgrounds = [
  "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
  "https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
  "https://image.tmdb.org/t/p/original/9OYu6oDLIidSOocW3JTGtd2Oyqy.jpg"
];

export default function HomeHero() {
  const [bg, setBg] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setBg((prev) => (prev + 1) % heroBackgrounds.length);
        setFade(true);
      }, 600);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-hero-bg">
      <div
        className={`home-hero-bg-img${fade ? " fade-in" : " fade-out"}`}
        style={{ backgroundImage: `url(${heroBackgrounds[bg]})` }}
      />
      <div className="home-hero-glass">
        <h1 className="home-hero-logo">
          <span className="aliflex-logo-animated">ALIFLEX</span>
          <span className="home-hero-tagline">Your Movie Universe</span>
        </h1>
        <p className="home-hero-desc">Discover trending, top-rated, and new movies. Start exploring the world of cinema now!</p>
      </div>
    </div>
  );
}
