import { Link } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Page Not Found</h1>
      <p className="notfound-text">Page not found.</p>
      <Link to="/" className="notfound-button">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
