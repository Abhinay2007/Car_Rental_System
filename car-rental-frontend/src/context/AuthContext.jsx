import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // ✅ login
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  // ✅ logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // clear user also
    setToken(null);
    setUser(null);
  };

  // ✅ fetch user from backend using /me
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const data = await getCurrentUser();
        setUser(data);

        // optional cache
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        console.error("Failed to fetch user");
        logout(); // token invalid → logout
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};