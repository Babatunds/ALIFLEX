import React, { useEffect, useState } from "react";
import { getAnimationMovies } from "../utils/api";
import Browse from "../components/Browse";

export default function AnimationPage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAnimationMovies(1).then(data => {
      setMovies(data.results || []);
    });
  }, []);
  return (
    <div className="section-card" style={{marginTop: 32, minHeight: 340}}>
      <h3 style={{ color: '#fff', marginLeft: 8, fontWeight: 600, fontSize: '1.4rem' }}>
        Animation Movies
      </h3>
  <Browse category={null} title={null} movies={movies} layout="grid" />
    </div>
  );
}
