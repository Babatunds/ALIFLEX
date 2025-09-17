import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import AnimationPage from "./pages/AnimationPage";
import GenrePage from "./pages/GenrePage";


function AppRoutes({ searchResults, setSearchResults }) {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home searchResults={searchResults} setSearchResults={setSearchResults} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/animation" element={<AnimationPage />} />
        <Route path="/crime" element={<GenrePage genreId={80} title="Crime" />} />
        <Route path="/comedy" element={<GenrePage genreId={35} title="Comedy" />} />
        <Route path="/romance" element={<GenrePage genreId={10749} title="Romance" />} />
      </Routes>
    </>
  );
}

function App() {
  const [searchResults, setSearchResults] = useState(null);
  return (
    <Router>
      <AppRoutes searchResults={searchResults} setSearchResults={setSearchResults} />
    </Router>
  );
}

export default App;

