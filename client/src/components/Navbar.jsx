import React from 'react';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Logo from './Logo';
import NavLinks from './NavLinks';
import Button from './Button';
import userPlaceholder from '../assets/user.png';
import SubmitButton from './SubmitButton'; 

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  //console.log("Navbar auth context:", user, isAuthenticated);

  return (
    <nav className="p-4 flex justify-between items-center border-b border-gray-300">
      {/* Left - Logo */}
      <Logo />

      {/* Center - Navigation Links */}
      <NavLinks />

      {/* Right - Conditional Rendering based on Authentication */}
      {isAuthenticated ? (
        <div className="profile-section flex items-center space-x-3">
          {/* Wrap profile picture and name with Link to /profile */}
          <Link to="/profile" className="flex items-center space-x-2 hover:underline">
            <img
              src={
                user?.profilePic && user.profilePic !== "https://via.placeholder.com/100"
                  ? user.profilePic
                  : userPlaceholder
              }
              alt="Profile"
              className="profile-icon w-8 h-8 rounded-full"
            />
            {user?.name && <span className="text-gray-700">{user.name}</span>}
          </Link>

          <SubmitButton label="Logout" onClick={logout} />
        </div>
      ) : (
        <div className="flex space-x-3">
          <Button to="/login" label="Login" />
          <Button to="/signup" label="Sign Up" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
