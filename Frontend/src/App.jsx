import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./features/movies/pages/Movies";
import MovieDetail from "./features/movies/pages/MovieDetail";
import MovieAdd from "./features/movies/pages/MovieAdd";
import MovieEdit from "./features/movies/pages/MovieEdit";
import ProtectedRoute from "./shared/ProtectedRoute";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/new"
          element={
            <ProtectedRoute>
              <MovieAdd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:id/edit"
          element={
            <ProtectedRoute>
              <MovieEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <MovieDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
};

export default App;
