import { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/movies");
    } catch (err) {
      setError("Неверный email или пароль");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Войти</button>
      <p>
        Нет аккаунта?{" "}
        <button type="button" onClick={() => navigate("/register")}>
          Зарегистрироваться
        </button>
      </p>
    </form>
  );
}
