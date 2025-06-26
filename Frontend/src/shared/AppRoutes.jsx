import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./shared/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import MovieAdd from "./pages/MovieAdd";
import MovieEdit from "./pages/MovieEdit";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/movies"
        element={
          <ProtectedRoute user={user}>
            <Movies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute user={user}>
            <MovieDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/:id/edit"
        element={
          <ProtectedRoute user={user}>
            <MovieEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/new"
        element={
          <ProtectedRoute user={user}>
            <MovieAdd />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
