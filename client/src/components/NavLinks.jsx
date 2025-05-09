// NavLinks.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => (
  <div className="flex space-x-4">
    <Link to="/Answer" className="hover:text-blue-500 transition duration-300">Answer</Link>
    <Link to="/Post" className="hover:text-blue-500 transition duration-300">Post</Link>
    <Link to="/Gspaces" className="hover:text-blue-500 transition duration-300">Gspaces</Link>
    <Link to="/Quests" className="hover:text-blue-500 transition duration-300">Quests</Link>
  </div>
);

export default NavLinks;
