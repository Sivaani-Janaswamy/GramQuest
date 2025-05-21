import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaSearch, FaSortAmountUp, FaStar, FaClock, FaFilter } from 'react-icons/fa';
import { createFilterObject } from '../../../utils/filterUtils';
import { motion, AnimatePresence } from 'framer-motion';

const SearchAndFilter = ({ onSearchChange, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(createFilterObject(filter));
    setIsFilterOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      scale: 1,
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.3, ease: 'easeOut' },
        scale: { duration: 0.2, ease: 'easeOut' }
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      scale: 0.95,
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.3, ease: 'easeIn' },
        scale: { duration: 0.2, ease: 'easeIn' }
      },
    },
  };

  return (
    <div className="flex items-center w-full">
      {/* Search Bar with Embedded Filter Button */}
      <div
        className="relative flex items-center flex-grow
                   border border-gray-300 rounded-lg shadow-sm overflow-visible
                   focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-gray-400
                   transition-all duration-200"
        ref={filterRef}
      >
        {/* Search Icon */}
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />

        {/* Input Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={selectedFilter ? `Search with ${selectedFilter} filter...` : "Search ..."}
          className="flex-1 py-2.5 pl-10 pr-[4.5rem] bg-white text-gray-800 placeholder-gray-400 outline-none rounded-l-lg"
        />

        {/* Filter Button - REMOVED INNER BORDER */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          type="button"
          className="
            flex items-center justify-center
            h-full px-4 
            bg-white text-gray-500
            transition-colors duration-200
            focus:outline-none 
            flex-shrink-0
          "
          aria-expanded={isFilterOpen}
          aria-haspopup="true"
        >
          <FaFilter className="h-5 w-5" />
          {selectedFilter && (
            <span className="ml-2 text-xs font-medium hidden sm:inline">
              {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
            </span>
          )}
        </button>

        {/* Filter Dropdown */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              variants={filterVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-20 origin-top-right rounded-md overflow-hidden"
              style={{ top: 'calc(100% + 8px)' }}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="filter-menu-button"
            >
              <div className="py-1">
                {/* Filter Options */}
                <button
                  onClick={() => handleFilterChange('upvotes')}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <FaSortAmountUp className="mr-2" /> Filter by Upvotes
                </button>
                <button
                  onClick={() => handleFilterChange('stars')}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <FaStar className="mr-2" /> Filter by Stars
                </button>
                <button
                  onClick={() => handleFilterChange('recent')}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <FaClock className="mr-2" /> Sort by Most Recent
                </button>
                <button
                  onClick={() => handleFilterChange('oldest')}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <FaClock className="mr-2" /> Sort by Oldest
                </button>
                <button
                  onClick={() => handleFilterChange('')}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <FaFilter className="mr-2" /> Clear Filter
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchAndFilter;