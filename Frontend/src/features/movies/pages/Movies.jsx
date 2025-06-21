import { useEffect, useState } from "react";
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
    status: "",
    rating: "",
    genre: "",
    ageRating: "",
    sort: "",
  });
  const [metadata, setMetadata] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("/api/v1/movies", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(res.data.movies);
      } catch (err) {
        setError("Failed to load movies");
      }
    };

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

    fetchMovies();
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
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (err) {
      alert("Failed to delete movie");
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ status: "", rating: "", genre: "", ageRating: "", sort: "" });
    setCurrentPage(1);
  };

  const filteredMovies = movies
    .filter((movie) =>
      filters.status ? movie.status === filters.status : true
    )
    .filter((movie) =>
      filters.rating ? movie.rating === filters.rating : true
    )
    .filter((movie) =>
      filters.genre ? movie.genres?.includes(filters.genre) : true
    )
    .filter((movie) =>
      filters.ageRating ? movie.ageRating === filters.ageRating : true
    )
    .sort((a, b) => {
      if (!filters.sort) return 0;
      const valA = isNaN(a.rating) ? 0 : Number(a.rating);
      const valB = isNaN(b.rating) ? 0 : Number(b.rating);
      return filters.sort === "asc" ? valA - valB : valB - valA;
    });

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const start = (currentPage - 1) * moviesPerPage;
  const paginatedMovies = filteredMovies.slice(start, start + moviesPerPage);

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
        />
        <button
          className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {paginatedMovies.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">
          No movies found for current filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedMovies.map((movie) => (
            <div
              key={movie._id}
              className="border border-gray-300 rounded p-4 shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{movie.title}</h3>
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
