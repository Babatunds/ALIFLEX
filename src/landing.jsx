import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Landing() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="main">
      {images.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      <div className="overlay">
        <img src="/favicon.png" alt="Aliflex Logo" className="logo" />
        <h1 className="title">Welcome to Aliflex</h1>
        <p className="subtitle">Discover and search your favorite movies</p>
        <button onClick={() => navigate("/home")} className="play-now">
          Play Now
        </button>
      </div>
    </div>
  );
}

export default Landing;
