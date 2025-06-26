import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/index.js";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setUser({
            name: res.data.user.name,
            email: localStorage.getItem("userEmail"),
          });
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userEmail", userData.user.email);
    localStorage.setItem("userName", userData.user.name);
    setUser({
      name: userData.user.name,
      email: userData.user.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
  };
  if (loading) return null;
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
