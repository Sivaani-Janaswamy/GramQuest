import { Link } from 'react-router-dom';
import Logo from './Logo';
import NavLinks from './NavLinks';
import {Confirmation, Button} from '../../common';
import { useAuth } from '../../../context/AuthContext';
import useLogoutConfirmation from '../../../hooks/useLogoutConfirmation';
import userPlaceholder from '../../../assets/user.png';

const Navbar = ({ onLogout }) => {
  const { isAuthenticated, user } = useAuth();
  const {
    showModal,
    handleLogoutClick,
    confirmLogout,
    cancelAction,
  } = useLogoutConfirmation(onLogout);

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
                <button
                  onClick={handleLogoutClick}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none transition duration-200 ease-in-out"
                >
                  Logout
                </button>
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

      <Confirmation
        isOpen={showModal}
        onClose={cancelAction}
        onConfirm={confirmLogout}
        message="Are you sure you want to logout?"
        confirmText="Yes, Logout"
        cancelText="Cancel"
      />
    </>
  );
};

export default Navbar;