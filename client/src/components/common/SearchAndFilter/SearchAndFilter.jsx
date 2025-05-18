import { useState, useRef, useEffect } from 'react';
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
    setIsFilterOpen(false);
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
      transition: {
        opacity: { duration: 0.2 },
        height: 'auto',
        transition: { duration: 0.3 },
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.2 },
      },
    },
  };

  return (
    <div className="flex items-center w-full max-w-4xl mx-auto">
      {/* Search Bar with Filter Button */}
      <div className="relative flex-grow flex items-center" ref={filterRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={selectedFilter ? `Search with ${selectedFilter} filter...` : "Search ..."}
          className={`w-full px-4 py-2 pl-10 pr-12 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-gray-200`}
        />
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          type="button"
          className={`absolute right-0 top-0 h-full px-4 rounded-md bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center`}
          aria-expanded={isFilterOpen}
          aria-haspopup="true"
        >
          <FaFilter className="h-5 w-5" />
          {selectedFilter && (
            <span className="ml-2 text-xs font-medium">
              {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
            </span>
          )}
        </button>
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              variants={filterVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 origin-top-right"
              style={{ top: '100%' }}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="filter-menu-button"
            >
              <div className="py-1">
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
