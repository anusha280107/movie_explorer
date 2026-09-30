import { Link } from "react-router-dom";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="movie-card">
      <div className="poster-container">
        <img src={poster} alt={movie.Title} />

        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(movie)}
          title="Add to favorites"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        <div className="movie-year">{movie.Year}</div>
      </div>

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <div className="movie-meta">
          <span>🎬 {movie.Type}</span>
          <span>📅 {movie.Year}</span>
        </div>

        <Link to={`/movie/${movie.imdbID}`} className="details-btn">
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;