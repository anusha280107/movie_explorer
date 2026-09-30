import { Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";

function Favorites({ favorites, onToggleFavorite }) {
  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <span className="small-title">YOUR COLLECTION</span>

        <h1>
          ❤️ My <span>Favorites</span>
        </h1>

        <p>
          Keep your favorite movies together and access them anytime.
        </p>
      </div>

      {favorites.length > 0 ? (
        <MovieGrid
          movies={favorites}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <div className="empty-favorites">
          <div>💔</div>

          <h2>No Favorites Yet</h2>

          <p>
            Start exploring movies and add your favorites here.
          </p>

          <Link to="/" className="browse-btn">
            Explore Movies
          </Link>
        </div>
      )}
    </main>
  );
}

export default Favorites;