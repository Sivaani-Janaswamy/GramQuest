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

  return (
    <nav className="bg-[#001A6E] text-[#E1FFBB] px-6 md:px-12 flex justify-between items-center shadow-md">
      {/* Left - Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex w-full justify-center">
        <NavLinks />
      </div>

      {/* Right - Auth Section */}
      <div className="flex items-center space-x-6">
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            {/* Profile Picture and Name */}
            <Link to="/profile" className="flex items-center space-x-2 group">
              <img
                src={
                  user?.profilePic && user.profilePic !== "https://via.placeholder.com/100"
                    ? user.profilePic
                    : userPlaceholder
                }
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-[#009990] group-hover:scale-105 transition duration-200"
              />
              {user?.name && (
                <span className="text-sm font-medium group-hover:text-[#009990] transition">
                  {user.name}
                </span>
              )}
            </Link>

            {/* Logout Button */}
            <div className="ml-6"> {/* Added margin-left to separate logout button */}
              <SubmitButton label="Logout" onClick={logout} />
            </div>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button to="/login" label="Login" />
            <Button to="/signup" label="Sign Up" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
