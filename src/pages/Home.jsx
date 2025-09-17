
import React from "react";
import Slider from "react-slick";
import HomeHero from "../components/HomeHero";
import Spotlight from "../components/Spotlight";
import Browse from "../components/Browse";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home({ searchResults, searching, setSearchResults }) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="home-bg">
      {searchResults ? (
        <div className="section-card search-results-card" style={{marginTop: 32, minHeight: 340}}>
          <h3 style={{ color: '#fff', marginLeft: 8, fontWeight: 600, fontSize: '1.4rem' }}>
            Search results for: <span style={{ color: '#ff4c4c' }}>{searchResults.query}</span>
            <button style={{marginLeft: 16, background: 'none', color: '#fff', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem'}} onClick={() => setSearchResults(null)}>Clear</button>
          </h3>
          <div className="movie-list">
            {searching ? (
              <div className="search-placeholder">Searching...</div>
            ) : searchResults.results.length === 0 ? (
              <div className="search-placeholder">No results found.</div>
            ) : (
              <>
                <Slider {...sliderSettings}>
                  {searchResults.results.map(movie => (
                    <div key={movie.id}>
                      <Browse category={null} title={null} movies={[movie]} />
                    </div>
                  ))}
                </Slider>
                <div className="search-guidance">Click a movie to see details</div>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <HomeHero />
          <div className="section-card" style={{marginTop: 0}}>
            <Spotlight />
          </div>
          <div className="section-divider" />
          <div className="section-card">
            <Browse category="trending" title="TRENDING" layout="scroll" />
          </div>
          <div className="section-divider" />
          <div className="section-card">
            <Browse category="romance" title="ROMANCE" layout="scroll" />
          </div>
          <div className="section-divider" />
          <div className="section-card">
            <Browse category="animation" title="ANIMATION" layout="scroll" />
          </div>
          <div className="section-divider" />
          <div className="section-card">
            <Browse category="top_rated" title="TOP RATED" layout="scroll" />
          </div>
          <div className="section-divider" />
          <div className="section-card">
            <Browse category="upcoming" title="New to Aliflex" layout="scroll" />
          </div>
          {/* Romance section removed as requested */}
        </>
      )}
    </div>
  );
}
