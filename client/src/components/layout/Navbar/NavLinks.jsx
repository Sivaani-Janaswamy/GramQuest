import { Link } from 'react-router-dom';

const NavLinks = ({ className }) => (
  <div className={`flex space-x-4 ${className}`}>
    <Link
      to="/Answer"
      className="text-gray-600 hover:text-blue-500 focus:outline-none transition duration-200 text-sm font-medium"
    >
      Answer
    </Link>
    <Link
      to="/Post"
      className="text-gray-600 hover:text-blue-500 focus:outline-none transition duration-200 text-sm font-medium"
    >
      Post
    </Link>
    <Link
      to="/Gspaces"
      className="text-gray-600 hover:text-blue-500 focus:outline-none transition duration-200 text-sm font-medium"
    >
      Gspaces
    </Link>
    <Link
      to="/Quests"
      className="text-gray-600 hover:text-blue-500 focus:outline-none transition duration-200 text-sm font-medium"
    >
      Quests
    </Link>
  </div>
);

export default NavLinks;