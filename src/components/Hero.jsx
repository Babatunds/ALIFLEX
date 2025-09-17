import "./Hero.css";

function Hero() {
  return (
    <div className="hero">
      <nav className="navbar">
        <div className="logo">Aliflex</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Movies</li>
          <li>Series</li>
          <li>About</li>
        </ul>
      </nav>

      <div className="hero-content">
        <h1>Featured Movies</h1>
        <p>Search now on Aliflex</p>
        <div className="buttons">
          <button className="btn">Play</button>
          <button className="btn btn-secondary">More Info</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
