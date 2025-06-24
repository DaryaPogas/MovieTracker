import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import "./Home.css";
import Footer from "../shared/Layouts/Footer"
import homePage from '../assets/home_page.jpg'

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
    <div className="page-wrapper">
      <div className="home-page">
        <div className="left-column">
          <img src={homePage} alt="Movies" className="home-image" />
        </div>
        <div className="right-column">
          <div className="form-wrapper">
            <div className="tab-buttons">
              <button
                className={`tab-button ${tab === "login" ? "active-tab" : ""}`}
                onClick={() => setTab("login")}
              >
                Login
              </button>
              <button
                className={`tab-button ${
                  tab === "register" ? "active-tab" : ""
                }`}
                onClick={() => setTab("register")}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {tab === "register" && (
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              )}

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="auth-input"
                required
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="auth-input"
                required
              />
              {tab === "register" && (
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="auth-input"
                  required
                />
              )}
              {error && <p className="auth-error">{error}</p>}
              <button type="submit" className="submit-button">
                {tab === "login" ? "Login" : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default Home;