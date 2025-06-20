import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Shared/ProtectedRoute";
import useAuth from "../hooks/useAuth";

import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetail from "../pages/MovieDetail";
import MovieForm from "../pages/MovieForm";

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
            <MovieForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/new"
        element={
          <ProtectedRoute user={user}>
            <MovieForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
