import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the API client

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const res = await api.get('/users/me');
          setIsAuthenticated(true);
          setUser(res.data.user);
        } catch (error) {
          console.error("Authentication check error", error);
          localStorage.removeItem('authToken');
          // Optionally navigate to login
          // navigate('/login');
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/users/login', { email, password });
      localStorage.setItem('authToken', res.data.token);
      setIsAuthenticated(true);
      setUser(res.data.user);
      // Do NOT navigate here; let caller decide
      return res.data.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const res = await api.post('/users/signup', userData);
      localStorage.setItem('authToken', res.data.token);
      setIsAuthenticated(true);
      setUser(res.data.user);
      // Do NOT navigate here; let caller decide
      return res.data.user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = (callback) => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
    if (typeof callback === 'function') {
      callback();
    }
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
