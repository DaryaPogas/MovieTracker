import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieForm from "../components/Movies/MovieForm";
import useAuth from "../hooks/useAuth";

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
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
      <MovieForm onSubmit={handleCreate} />
    </div>
  );
};

export default MovieAdd;
