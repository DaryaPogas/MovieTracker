import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/index";
import { useAuth } from "../../../context/AuthContext";
import MovieFilters from "../components/MovieFilters";
import "./Movies.css";
import defaultPoster from "../../../assets/movie_default.jpg";

const Movies = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    rating: "",
    genre: "",
    ageRating: "",
    sort: "",
  });
  const [metadata, setMetadata] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const moviesPerPage = 5;

  const fetchMovies = useCallback(async () => {
    try {
      const params = {
        ...filters,
        page: currentPage,
        limit: moviesPerPage,
      };
      const res = await API.get("/movies", {params});
      setMovies(res.data.movies);
      setTotalMovies(res.data.count);
    } catch (err) {
      setError("Failed to load movies");
    }
  }, [token, filters, currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await API.get("/movies/metadata")
        setMetadata(res.data.data);
      } catch (err) {
        console.error("Failed to load metadata");
      }
    };
    fetchMetadata();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmed) return;
    try {
      await API.delete(`/movies/${id}`);
      fetchMovies();
    } catch (err) {
      alert("Failed to delete movie");
    }
  };

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      search: "",
      status: "",
      rating: "",
      genre: "",
      ageRating: "",
      sort: "",
    });
    setCurrentPage(1);
  }, []);

  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  return (
    <div className="movies-container">
      <div className="movies-header">
        <h2 className="movies-title">My Movies</h2>
        <button className="add-btn" onClick={() => navigate("/movies/new")}>
          Add Movie
        </button>
      </div>

      <div className="ffilters-row">
        <MovieFilters
          metadata={metadata}
          filters={filters}
          onFilterChange={handleFilterChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onSearchClick={fetchMovies}
        />
        <button className="clear-btn" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {movies.length === 0 ? (
        <p className="no-movies">No movies found for current filters.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div
              key={movie._id}
              onClick={() => navigate(`/movies/${movie._id}`)}
              className="movie-card"
            >
              <img
                src={movie.posterUrl?.trim() ? movie.posterUrl : defaultPoster}
                alt={movie.title}
                className="poster"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultPoster;
                }}
              />
              <span className={`badge ${movie.status}`}>{movie.status}</span>
              <div className="movie-title" title={movie.title}>
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;