import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Optional: store user data
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      // Example using fetch with a backend API
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      setIsAuthenticated(true);
      setUser(data.user); // Assuming the API returns user info

    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const logout = () => {
    console.log("Logout function triggered");
    setIsAuthenticated(false);
    setUser(null);
    // Clear localStorage/sessionStorage or cookies
    localStorage.removeItem("authToken");
    // Redirect user to login page after logout
    navigate("/");
  };

  // New function to update user profile picture
  const updateUserProfilePic = (newProfilePic) => {
    setUser((prevUser) => ({
      ...prevUser,
      profilePic: newProfilePic, // Update profilePic in the user object
    }));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, updateUserProfilePic }}>
      {children}
    </AuthContext.Provider>
  );
}
