import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/v1/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovie(res.data.movie);
      } catch (err) {
        setError("Failed to load movie");
      }
    };
    fetchMovie();
  }, [id, token]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmed) return;
    try {
      await axios.delete(`/api/v1/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/movies");
    } catch (err) {
      alert("Failed to delete movie");
    }
  };

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!movie) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
      <p className="text-gray-700">Status: {movie.status}</p>
      <p className="text-gray-700">Rating: {movie.rating}</p>
      <p className="text-gray-700">Genres: {movie.genres?.join(", ")}</p>
      <p className="text-gray-700">Age Rating: {movie.ageRating}</p>
      <p className="text-sm text-gray-500 mt-4">
        Added: {new Date(movie.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(`/movies/${movie._id}/edit`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/movies")}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
