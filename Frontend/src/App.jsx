import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import MovieAdd from "./Pages/MovieAdd";
import MovieEdit from "./Pages/MovieEdit";
import MovieDetail from "./Pages/MovieDetail";
import ProtectedRoute from "./components/ProtectedRoute";

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
