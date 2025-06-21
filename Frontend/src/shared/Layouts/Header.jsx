import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/movies" className="nav-link">
          All Movies
        </Link>
        <Link to="/movies/add" className="btn-add">
          + Add New Movie
        </Link>
      </nav>
    </header>
  );
}
