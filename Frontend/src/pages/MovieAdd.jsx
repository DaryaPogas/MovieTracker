import { useNavigate } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import API from "../api/index";
import "./MovieAdd.css";
const MovieAdd = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await API.post("/movies", data);
      navigate("/movies");
    } catch {
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
