import { Link } from 'react-router-dom';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { Confirmation } from '../../common';
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
      <nav className="bg-white text-gray-800 py-4 px-6 md:px-12 flex justify-between items-center shadow-sm border-b border-gray-200">
        <div className="flex items-center">
          <Link to="/" className="focus:outline-none">
            <Logo />
          </Link>
        </div>
        <div className="hidden md:flex w-full justify-center space-x-8">
          <NavLinks className="flex items-center space-x-4" />
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center">
              <Link to="/profile" className="flex items-center space-x-2 group focus:outline-none">
                <img
                  src={
                    user?.profilePic && user.profilePic !== "[https://via.placeholder.com/100](https://via.placeholder.com/100)"
                      ? user.profilePic
                      : userPlaceholder
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-300 group-hover:border-blue-500 transition duration-200"
                />
                {user?.name && (
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-500 transition">
                    {user.name}
                  </span>
                )}
              </Link>
              <div className="ml-10 flex items-center">
                <button
                  onClick={handleLogoutClick}
                  className="text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3"> {/* Changed to items-center */}
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-blue-500 focus:outline-none transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="whitespace-nowrap text-sm font-medium text-gray-600 hover:text-blue-500 focus:outline-none transition duration-200" 
              >
                Sign Up
              </Link>
            </div>
          )}
          <div className="md:hidden">
            <button className="focus:outline-none text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-5h18V6H3v2z" />
              </svg>
            </button>
          </div>
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