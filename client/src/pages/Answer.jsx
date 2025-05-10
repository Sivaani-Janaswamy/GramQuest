import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthRedirect from '../hooks/useAuthRedirect';
import PostForm from '../components/PostForm';
import RecentPosts from '../components/RecentPosts';
import FilterComponent from '../components/Filter'; // Import FilterComponent

const Answer = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();
  useAuthRedirect(navigate);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setFilteredPosts(response.data); // Set the initial filtered posts to all posts
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchPosts();
  }, []);

  // Handle filter changes
  const handleFilterChange = ({ filterByUpvotes, filterByStars, sortByDate }) => {
    let updatedPosts = [...posts];

    // Apply the filters
    if (filterByUpvotes) {
      updatedPosts = updatedPosts.filter(post => post.upvotes > 10); // Filter by upvotes (greater than 10 for example)
    }

    if (filterByStars) {
      updatedPosts = updatedPosts.filter(post => post.stars >= 4); // Filter by stars (greater than or equal to 4)
    }

    if (sortByDate) {
      updatedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date (most recent first)
    }

    setFilteredPosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="container mx-auto space-y-6">
        {/* Page Title and Filter */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Answer Questions</h1>
          <p className="text-lg text-gray-600 mb-6">
            Browse and answer questions from the community.
          </p>
          <FilterComponent onFilterChange={handleFilterChange} />
        </div>

        {/* Display Recent Posts */}
        <h2 className="text-2xl font-semibold text-center mb-4">Recent Posts</h2>
        <RecentPosts posts={filteredPosts} />
      </div>
    </div>
  );
};

export default Answer;
