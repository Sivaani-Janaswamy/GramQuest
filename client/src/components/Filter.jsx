import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false); // Close the dropdown after selection

    // Pass the filter option to the parent component
    if (filter === 'upvotes') {
      onFilterChange({ filterByUpvotes: true, filterByStars: false, sortByDate: false });
    } else if (filter === 'stars') {
      onFilterChange({ filterByUpvotes: false, filterByStars: true, sortByDate: false });
    } else if (filter === 'recent') {
      onFilterChange({ filterByUpvotes: false, filterByStars: false, sortByDate: true });
    } else {
      onFilterChange({ filterByUpvotes: false, filterByStars: false, sortByDate: false });
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 focus:outline-none"
      >
        {selectedFilter ? selectedFilter : 'Filter Options'}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => handleFilterChange('upvotes')}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            >
              Filter by Upvotes
            </button>
            <button
              onClick={() => handleFilterChange('stars')}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            >
              Filter by Stars
            </button>
            <button
              onClick={() => handleFilterChange('recent')}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            >
              Sort by Most Recent
            </button>
            <button
              onClick={() => handleFilterChange('')}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
