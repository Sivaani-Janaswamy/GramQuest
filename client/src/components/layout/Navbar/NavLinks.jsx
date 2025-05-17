import { Link } from 'react-router-dom';

const NavLinks = () => (
  <div className="flex space-x-8 ">
    <Link 
      to="/Answer" 
      className="text-[#E1FFBB] hover:bg-[#b4ff8c] hover:text-emerald-600 py-7.5 px-6  transition-all duration-300 text-base font-semibold flex items-center"
    >
      Answer
    </Link>
    <Link 
      to="/Post" 
      className="text-[#E1FFBB] hover:bg-[#b4ff8c] hover:text-emerald-600 py-7.5 px-6  transition-all duration-300 text-base font-semibold flex items-center"
    >
      Post
    </Link>
    <Link 
      to="/Gspaces" 
      className="text-[#E1FFBB] hover:bg-[#b4ff8c] hover:text-emerald-600 py-7.5 px-6 transition-all duration-300 text-base font-semibold flex items-center"
    >
      Gspaces
    </Link>
    <Link 
      to="/Quests" 
      className="text-[#E1FFBB] hover:bg-[#b4ff8c] hover:text-emerald-600 py-7.5 px-6  transition-all duration-300 text-base font-semibold flex items-center"
    >
      Quests
    </Link>
  </div>
);

export default NavLinks;
