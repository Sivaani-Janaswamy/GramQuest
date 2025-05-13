import React, { useState, useEffect } from 'react';
import PostList from './PostList';      // Component that displays posts
import Filter from './Filter';          // Component for filtering/sorting
import SearchBar from './SearchBar';    // Component for search

const RecentPosts = ({ posts, isPostTab, refreshPosts }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Handle filter changes
  const handleFilterChange = (filterOptions) => {
    let filtered = [...posts];

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

    setFilteredPosts(filtered);
  };

  useEffect(() => {
    // Update filtered posts when the `posts` prop changes
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    // Initial filter: newest first
    handleFilterChange({
      filterByUpvotes: false,
      filterByStars: false,
      sortByDate: true,
      sortByOldest: false
    });
  }, []); // Only run once on mount

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6 space-x-3">
        <SearchBar onSearchChange={(value) => console.log('Search term:', value)} />
        <Filter onFilterChange={handleFilterChange} />
      </div>

      <PostList posts={filteredPosts} isPostTab={isPostTab} refreshPosts={refreshPosts} />
    </div>
  );
};

export default RecentPosts;
