import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MoviesPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <h1>My Movies</h1>
      {/* Your movie content here */}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default MoviesPage;
