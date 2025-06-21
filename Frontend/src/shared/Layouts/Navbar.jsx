// src/components/Layouts/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/movies" className="nav-link">
          My Movies
        </Link>

        {user && (
          <Link to="/movies/add" className="nav-link">
            Add Movie
          </Link>
        )}
      </div>

      {user ? (
        <button onClick={logout} className="btn-logout">
          Logout
        </button>
      ) : (
        <Link to="/login" className="btn-login">
          Login
        </Link>
      )}
    </nav>
  );
}
