import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("movieFavorites");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "movieFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (item) => item.imdbID === movie.imdbID
      );

      if (exists) {
        return currentFavorites.filter(
          (item) => item.imdbID !== movie.imdbID
        );
      }

      return [...currentFavorites, movie];
    });
  };

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/movie/:id"
          element={
            <MovieDetails
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>

      <footer className="footer">
        <div className="footer-logo">
          🎬 MovieExplorer
        </div>

        <p>
          Discover movies. Explore stories. Save favorites.
        </p>

        <span>Built with React ⚛️</span>
      </footer>
    </div>
  );
}

export default App;