import MovieCard from "./MovieCard";

function MovieGrid({ movies, favorites, onToggleFavorite }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎬</div>
        <h2>No Movies Found</h2>
        <p>Try searching with a different movie name.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={favorites.some(
            (item) => item.imdbID === movie.imdbID
          )}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default MovieGrid;