import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      fetchUser(token);
    }
  }, []);

  // Fetch user info
  const fetchUser = async (token) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Invalid token");
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error("Fetch user error:", err.message);
      logout(); // Force logout on error
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      localStorage.setItem("authToken", data.token);
      setIsAuthenticated(true);
      await fetchUser(data.token);
    } catch (error) {
      console.error("Login error:", error.message);
      throw error; // Let UI handle display
    }
  };

  // Logout
  const logout = (callback) => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
    if (callback) callback();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
