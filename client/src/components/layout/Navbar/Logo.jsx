import { Link } from 'react-router-dom';
import logo from '../../../assets/gq_logo.png';

const Logo = () => (
  <div className="flex items-center transform scale-110">
    <img
      src={logo}
      alt="Logo"
      className="h-8 w-auto mr-2"
    />
    <Link
      to="/"
      className="text-xl font-semibold text-gray-800 hover:text-blue-500 focus:outline-none transition duration-200"
    >
      GramQuest
    </Link>
  </div>
);

export default Logo;