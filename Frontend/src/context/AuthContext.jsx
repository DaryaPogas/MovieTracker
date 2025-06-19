import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/index.js";
const AuthContext = createContext();

// This is the main provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Here you could verify the token with your backend
      //setUser({ email: localStorage.getItem("userEmail") });
      API.get("/validate-token")
        .then(() => setUser({ email: localStorage.getItem("userEmail") }))
        .catch(() => logout());
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userEmail", userData.email);
    setUser({ email: userData.email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// This is the hook you need to export
export function useAuth() {
  return useContext(AuthContext);
}
