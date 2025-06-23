import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"
import Movies from "./features/movies/pages/Movies";
import MovieDetail from "./features/movies/pages/MovieDetail";
import MovieAdd from "./features/movies/pages/MovieAdd";
import MovieEdit from "./features/movies/pages/MovieEdit";
import ProtectedRoute from "./shared/ProtectedRoute";
import MainLayout from "./shared/Layouts/MainLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/movies"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Movies />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/new"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MovieAdd />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/:id/edit"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MovieEdit />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MovieDetail />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
