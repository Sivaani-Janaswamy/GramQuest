import { useState, useEffect } from 'react';

const usePostFilters = (initialPosts) => {
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [filterOptions, setFilterOptions] = useState({
    filterByUpvotes: false,
    filterByStars: false,
    sortByDate: true,
    sortByOldest: false,
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = [...initialPosts];

    if (filterOptions.filterByUpvotes) {
      filtered = filtered.filter(post => post.upvotes?.length > 0);
    }

    if (filterOptions.filterByStars) {
      filtered = filtered.filter(post => post.stars?.length > 0);
    }

    if (filterOptions.sortByDate) {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (filterOptions.sortByOldest) {
      filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [initialPosts, filterOptions, searchTerm]);

  const handleFilterChange = (newFilterOptions) => {
    setFilterOptions(newFilterOptions);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return { filteredPosts, handleFilterChange, handleSearchChange, filterOptions, searchTerm };
};

export default usePostFilters;