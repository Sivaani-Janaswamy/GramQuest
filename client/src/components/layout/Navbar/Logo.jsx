import { Link } from 'react-router-dom';
import logo from '../../../assets/gq_logo.png';

const Logo = () => (
  <div className="flex items-center">
    <img src={logo} alt="Logo" className="h-16 w-auto mr-2" />
    <Link 
      to="/" 
      className="text-lg font-semibold text-[#E1FFBB] hover:text-[#aaff6d] transition duration-300"
    >
      GramQuest
    </Link>
  </div>
);

export default Logo;
