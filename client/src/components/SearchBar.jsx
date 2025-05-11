import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value); // Call the parent function when the search term changes
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search posts..."
        className="w-full px-4 py-2 pl-10 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;
