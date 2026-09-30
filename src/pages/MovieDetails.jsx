import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function MovieDetails({ favorites, onToggleFavorite }) {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movie) {
    return null;
  }

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/400x600?text=No+Poster";

  const isFavorite = favorites.some(
    (item) => item.imdbID === movie.imdbID
  );

  return (
    <main className="details-page">
      <div className="details-container">
        <Link to="/" className="back-btn">
          ← Back to Movies
        </Link>

        <div className="details-card">
          <div className="details-poster">
            <img src={poster} alt={movie.Title} />
          </div>

          <div className="details-content">
            <div className="details-type">
              {movie.Type} • {movie.Year}
            </div>

            <h1>{movie.Title}</h1>

            <div className="rating-row">
              <div className="imdb-rating">
                <span>⭐</span>
                <strong>{movie.imdbRating}</strong>
                <small>/ 10</small>
              </div>

              <div className="votes">
                {movie.imdbVotes} votes
              </div>
            </div>

            <div className="genre-list">
              {movie.Genre?.split(",").map((genre) => (
                <span key={genre}>{genre.trim()}</span>
              ))}
            </div>

            <p className="plot">{movie.Plot}</p>

            <div className="movie-details-info">
              <div>
                <span>🎬 Director</span>
                <strong>{movie.Director}</strong>
              </div>

              <div>
                <span>🎭 Actors</span>
                <strong>{movie.Actors}</strong>
              </div>

              <div>
                <span>✍️ Writer</span>
                <strong>{movie.Writer}</strong>
              </div>

              <div>
                <span>🌍 Country</span>
                <strong>{movie.Country}</strong>
              </div>

              <div>
                <span>🗣️ Language</span>
                <strong>{movie.Language}</strong>
              </div>

              <div>
                <span>⏱️ Runtime</span>
                <strong>{movie.Runtime}</strong>
              </div>
            </div>

            <div className="details-actions">
              <button
                className="favorite-large-btn"
                onClick={() => onToggleFavorite(movie)}
              >
                {isFavorite
                  ? "❤️ Remove from Favorites"
                  : "🤍 Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;