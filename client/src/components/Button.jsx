import React from "react";
import { Link } from 'react-router-dom';

const Button = ({ label, to, className = '' }) => {
  return (
    <Link
      to={to}
      className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold text-gray-900 rounded-xl group bg-gradient-to-br from-teal-300 to-lime-300 
      group-hover:from-teal-400 group-hover:to-lime-400 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 ${className}`}
    >
      <span className="relative px-6 py-2.5 transition-all ease-in duration-100 bg-white dark:bg-gray-900 rounded-xl group-hover:bg-transparent group-hover:dark:bg-transparent whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
};

export default Button;
