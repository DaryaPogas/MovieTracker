import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import "./MovieDetail.css";
import defaultPoster from "../../../assets/movie_default.jpg";

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

  if (error) return <p className="error-text">{error}</p>;
  if (!movie) return <p className="loading-text">Loading...</p>;

  return (
    <div className="movie-detail-container">
      <img
        src={movie.posterUrl?.trim() ? movie.posterUrl : defaultPoster}
        alt={`${movie.title} poster`}
        className="movie-detail-poster"
      />

      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-field">Status: {movie.status}</p>
      <p className="movie-field">Rating: {movie.rating}</p>
      <p className="movie-field">Genres: {movie.genres?.join(", ")}</p>
      <p className="movie-field">Age Rating: {movie.ageRating}</p>
      {movie.review && (
        <div className="movie-review">
          <h3>Review</h3>
          <p>{movie.review}</p>
        </div>
      )}
      <p className="movie-date">
        Added: {new Date(movie.createdAt).toLocaleDateString()}
      </p>

      <div className="movie-actions">
        <button
          className="btn edit"
          onClick={() => navigate(`/movies/${movie._id}/edit`)}
        >
          Edit
        </button>
        <button className="btn delete" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn back" onClick={() => navigate("/movies")}>
          Back to List
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
