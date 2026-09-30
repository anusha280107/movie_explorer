const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const BASE_URL = "https://www.omdbapi.com/";

// Search movies
export const searchMovies = async (query, page = 1) => {
  if (!query) {
    return {
      Search: [],
      totalResults: 0,
    };
  }

  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
      query
    )}&type=movie&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Network error");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movies not found");
  }

  return data;
};

// Get movie details
export const getMovieDetails = async (imdbID) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
  );

  if (!response.ok) {
    throw new Error("Network error");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie details not found");
  }

  return data;
};