import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (tab === "register" && form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      const endpoint =
        tab === "login" ? "/api/v1/auth/login" : "/api/v1/auth/register";
      const payload =
        tab === "register"
          ? {
              name: form.name,
              email: form.email,
              password: form.password,
            }
          : {
              email: form.email,
              password: form.password,
            };
      const res = await axios.post(endpoint, payload);
      if (tab === "login") {
        login(res.data.token);
        navigate("/movies");
      } else {
        setTab("login");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Authentication failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 ${
            tab === "login" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${
            tab === "register" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("register")}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="border px-3 py-2 rounded"
          required
        />
        {tab === "register" && (
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="border px-3 py-2 rounded"
            required
          />
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {tab === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Home;
