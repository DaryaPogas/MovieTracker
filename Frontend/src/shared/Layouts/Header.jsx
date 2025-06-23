import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logoutIcon from "../../assets/logout.png";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="project-title">🎬 MovieTracker</h1>
      </div>
      {user && (
        <div className="header-right">
          <span className="user-name">Logged in as {user.name}</span>
          <button
            className="logout-button"
            onClick={handleLogout}
            title="Logout"
          >
            <img src={logoutIcon} alt="Logout" className="logout-icon" />
          </button>
        </div>
      )}
    </header>
  );
}
