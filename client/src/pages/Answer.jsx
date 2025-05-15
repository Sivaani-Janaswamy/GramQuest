import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthRedirect from '../hooks/useAuthRedirect';
import RecentPosts from '../components/RecentPosts';
import Sidebar from '../components/Sidebar';

const Answer = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useAuthRedirect(navigate);

  const refreshPosts = async () => { // Define the refreshPosts function here
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    refreshPosts(); // Call it on initial load
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-0 px-0">
      <div className="container  space-y-8">
        {/* Main Content and Sidebar Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 🠖 Move Sidebar First */}
          <Sidebar />

          <div className="flex-1">
            {/* Page Title and Description */}
            <div className="text-center mb-8 py-10">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Answer Questions</h1>
              <p className="text-lg text-gray-600 mb-3">
                Browse and answer questions from the community. Your insights help others!
              </p>
            </div>
            {/* Recent Posts */}
            <RecentPosts posts={posts} isPostTab={false} refreshPosts={refreshPosts} /> {/* Pass refreshPosts as a prop */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;