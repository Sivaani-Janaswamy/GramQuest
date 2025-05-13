import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from './Logo';
import NavLinks from './NavLinks';
import Button from './Button';
import userPlaceholder from '../assets/user.png';
import SubmitButton from './SubmitButton';
import ConfirmationModal from './ConfirmationModal'; // Import the modal

const Navbar = ({ onLogout }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalAction, setModalAction] = useState(''); // Store the current action for the modal

  const handleLogoutClick = () => {
    setModalAction('logout'); // Set the action to 'logout'
    setShowModal(true); // Show modal when logout button is clicked
  };

  const confirmLogout = () => {
    setShowModal(false); // Close the modal
    if (onLogout) {
      onLogout(navigate); // Call the passed-in logout function
    }
  };

  const cancelAction = () => {
    setShowModal(false); // Close the modal without doing anything
  };

  return (
    <>
      <nav className="bg-[#001A6E] text-[#E1FFBB] px-6 md:px-12 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="hidden md:flex w-full justify-center">
          <NavLinks />
        </div>
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-2 group">
                <img
                  src={
                    user?.profilePic && user.profilePic !== "[https://via.placeholder.com/100](https://via.placeholder.com/100)"
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
              <div className="ml-6">
                <SubmitButton label="Logout" onClick={handleLogoutClick} />
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={cancelAction}
        onConfirm={confirmLogout}
        message="Are you sure you want to logout?"
        confirmText="Yes, Logout" // Dynamic button text
        cancelText="Cancel" // Optional: Default 'Cancel' button text
      />
    </>
  );
};

export default Navbar;
