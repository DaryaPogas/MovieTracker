import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./shared/ProtectedRoute";
import {useAuth} from "../context/AuthContext"

import Home from "./pages/Home";
import Movies from "../features/movies/pages/Movies";
import MovieDetail from "../features/movies/pages/MovieDetail";
import MovieAdd from "../features/movies/pages/MovieAdd"
import MovieEdit from "../features/movies/pages/MovieEdit";

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
