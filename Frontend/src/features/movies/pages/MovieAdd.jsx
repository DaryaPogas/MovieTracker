import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieForm from "../components/MovieForm";
import useAuth from "../../../hooks/useAuth";
import "./MovieAdd.css"; 
const MovieAdd = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await axios.post("/api/v1/movies", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/movies");
    } catch (err) {
      alert("Failed to create movie");
    }
  };

  return (
    <div className="movie-add-container">
      <h2 className="movie-add-title">Add Movie</h2>
      <MovieForm onSubmit={handleCreate} />
    </div>
  );
};

export default MovieAdd;
