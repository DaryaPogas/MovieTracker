import { Link } from 'react-router-dom';

function MovieList({ movies }) {
  return (
    <div className="movie-grid">
      {movies.map(movie) => (
        <div key={movie._id} className="movie-card">
          <h3>{movie.title}</h3>
          <Link 
            to={`/movies/edit/${movie._id}`}
            className="edit-link"
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  )
}