import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 <span>Movie</span>Explorer
      </Link>

      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">🔍</button>
      </form>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">❤️ Favorites</Link>
      </div>
    </nav>
  );
}

export default Navbar;