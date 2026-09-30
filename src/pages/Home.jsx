import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/movieApi";
import MovieGrid from "../components/MovieGrid";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function Home({ favorites, onToggleFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("Avengers");

  const categories = [
    "Avengers",
    "Batman",
    "Harry Potter",
    "Marvel",
    "Mission Impossible",
    "Spider-Man",
    "Fast",
    "Star Wars",
  ];

  const loadMovies = async (query) => {
    setLoading(true);
    setError("");

    try {
      const data = await searchMovies(query);

      setMovies(data.Search || []);

      if (!data.Search || data.Search.length === 0) {
        setError("No movies found.");
      }
    } catch (err) {
      setMovies([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      loadMovies(searchQuery);
    } else {
      loadMovies(category);
    }
  }, [searchQuery, category]);

  const handleCategory = (item) => {
    setCategory(item);
    setSearchParams({});
  };

  const randomMovies = [
    "Inception",
    "Interstellar",
    "Titanic",
    "Avatar",
    "Gladiator",
    "Joker",
  ];

  const randomMovie = () => {
    const random =
      randomMovies[Math.floor(Math.random() * randomMovies.length)];

    setSearchParams({
      search: random,
    });
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">🍿 YOUR MOVIE UNIVERSE</span>

          <h1>
            Discover Your Next
            <span> Favorite Movie</span>
          </h1>

          <p>
            Search thousands of movies, explore details, check ratings,
            and save your favorites in one place.
          </p>

          <div className="hero-actions">
            <button className="random-btn" onClick={randomMovie}>
              🎲 Surprise Me
            </button>

            <a href="#movies" className="browse-btn">
              Explore Movies ↓
            </a>
          </div>
        </div>

        <div className="hero-decoration">
          <div className="floating-card card-one">🎬</div>
          <div className="floating-card card-two">⭐</div>
          <div className="floating-card card-three">🍿</div>
        </div>
      </section>

      <section className="category-section" id="movies">
        <div className="section-heading">
          <div>
            <span className="small-title">EXPLORE</span>
            <h2>Browse by Category</h2>
          </div>
        </div>

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item && !searchQuery
                  ? "category active"
                  : "category"
              }
              onClick={() => handleCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="movies-section">
        <div className="section-heading">
          <div>
            <span className="small-title">
              {searchQuery ? "SEARCH RESULTS" : "MOVIE COLLECTION"}
            </span>

            <h2>
              {searchQuery
                ? `Results for "${searchQuery}"`
                : `${category} Movies`}
            </h2>
          </div>

          {!loading && movies.length > 0 && (
            <span className="result-count">
              {movies.length} movies
            </span>
          )}
        </div>

        {loading && <Loader />}

        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <MovieGrid
            movies={movies}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </section>
    </main>
  );
}

export default Home;