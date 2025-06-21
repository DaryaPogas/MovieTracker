import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import MovieFilters from "../components/MovieFilters";

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
      const res = await axios.get("/api/v1/movies", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
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
        const res = await axios.get("/api/v1/movies/metadata", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      await axios.delete(`/api/v1/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Movies</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/movies/new")}
        >
          Add Movie
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <MovieFilters
          metadata={metadata}
          filters={filters}
          onFilterChange={handleFilterChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onSearchClick={fetchMovies}
        />
        <button
          className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {movies.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">
          No movies found for current filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="border border-gray-300 rounded p-4 shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-600">
                Director: {movie.director}
              </p>
              <p className="text-sm text-gray-600">Status: {movie.status}</p>
              <p className="text-sm text-gray-600">Rating: {movie.rating}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => navigate(`/movies/${movie._id}`)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/movies/${movie._id}/edit`)}
                  className="text-yellow-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
