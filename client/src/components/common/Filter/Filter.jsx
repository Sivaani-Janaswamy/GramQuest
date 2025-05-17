import { useState } from 'react';
import { FaSortAmountUp, FaStar, FaClock, FaFilter } from 'react-icons/fa';
import { createFilterObject } from '../../../utils/filterUtils';

const Filter = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('recent');
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
    onFilterChange(createFilterObject(filter));
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-6 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none transition duration-200 ease-in-out"
      >
        <FaFilter className="mr-2" />
        {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
          <div className="py-1">
            <button onClick={() => handleFilterChange('upvotes')} className="flex items-center px-4 py-2 text-white hover:bg-gray-700 w-full text-left">
              <FaSortAmountUp className="mr-2" /> Filter by Upvotes
            </button>
            <button onClick={() => handleFilterChange('stars')} className="flex items-center px-4 py-2 text-white hover:bg-gray-700 w-full text-left">
              <FaStar className="mr-2" /> Filter by Stars
            </button>
            <button onClick={() => handleFilterChange('recent')} className="flex items-center px-4 py-2 text-white hover:bg-gray-700 w-full text-left">
              <FaClock className="mr-2" /> Sort by Most Recent
            </button>
            <button onClick={() => handleFilterChange('oldest')} className="flex items-center px-4 py-2 text-white hover:bg-gray-700 w-full text-left">
              <FaClock className="mr-2" /> Sort by Oldest
            </button>
            <button onClick={() => handleFilterChange('')} className="flex items-center px-4 py-2 text-white hover:bg-gray-700 w-full text-left">
              <FaFilter className="mr-2" /> Clear Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;