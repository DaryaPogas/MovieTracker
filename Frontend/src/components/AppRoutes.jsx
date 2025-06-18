import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from './Authentication/LoginForm';
import RegisterForm from './Authentication/RegisterForm';
import MoviesPage from './Pages/MoviesPage';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route path="/login" element={user ? <Navigate to="/movies" /> : <LoginForm />} />
      <Route path="/register" element={user ? <Navigate to="/movies" /> : <RegisterForm />} />

      {/* Защищенные маршруты */}
      <Route
        path="/movies"
        element={user ? <MoviesPage /> : <Navigate to="/login" />}
      />

      {/* Перенаправление */}
      <Route path="/" element={<Navigate to={user ? '/movies' : '/login'} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}