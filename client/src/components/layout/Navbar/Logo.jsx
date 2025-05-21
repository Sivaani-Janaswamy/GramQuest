import { Link } from 'react-router-dom';
import logo from '../../../assets/gq_logo.png';

const Logo = () => (
  <div className="flex items-center">
    <img
      src={logo}
      alt="Logo"
      className="h-7 w-auto mr-1.5"
    />
    <Link
      to="/"
      className="text-lg font-semibold text-gray-800 hover:text-blue-500 focus:outline-none transition duration-200"
    >
      GramQuest
    </Link>
  </div>
);

export default Logo;