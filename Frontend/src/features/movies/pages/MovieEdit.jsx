import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieForm from "../components/MovieForm";
import useAuth from "../../../hooks/useAuth";
import "./MovieEdit.css";

const MovieEdit = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/v1/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovie(res.data.movie);
      } catch (err) {
        setError("Failed to load movie");
      }
    };
    fetchMovie();
  }, [id, token]);

  const handleUpdate = async (data) => {
    try {
      await axios.patch(`/api/v1/movies/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/movies");
    } catch (err) {
      alert("Failed to update movie");
    }
  };

  if (error) return <p className="edit-error">{error}</p>;
  if (!movie) return <p className="edit-loading">Loading...</p>;

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit Movie</h2>
      <MovieForm initialData={movie} onSubmit={handleUpdate} isEditing />
    </div>
  );
};

export default MovieEdit;
