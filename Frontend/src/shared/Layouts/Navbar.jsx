import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"}>
        My Movies
      </NavLink>
    </nav>
  );
}
