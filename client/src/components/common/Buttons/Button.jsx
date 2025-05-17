import { Link } from "react-router-dom";

const Button = ({ label, to, className = '' }) => {
  return (
    <Link to={to}>
      <button
        className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 ${className}`}
      >
        {label}
      </button>
    </Link>
  );
};

export default Button;
