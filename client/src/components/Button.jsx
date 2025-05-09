// Button.jsx
import React from "react";
import { Link } from 'react-router-dom';

const Button = ({ label, to, className = '' }) => {
  return (
    <Link
      to={to}  // Link to the provided 'to' prop
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${className}`}
    >
      {label}
    </Link>
  );
};

export default Button;
