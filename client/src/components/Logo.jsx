import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/gq_logo.png';

const Logo = () => (
  <div className="flex items-center">
    <img src={logo} alt="Logo" className="h-16 w-auto mr-2" />
    <Link to="/" className="text-lg font-semibold text-blue-600">GramQuest</Link>
  </div>
);

export default Logo;
