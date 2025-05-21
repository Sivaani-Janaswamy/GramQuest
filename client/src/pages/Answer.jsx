import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthRedirect from '../hooks/useAuthRedirect';
import { RecentPosts } from '../components/Posts';
import { Sidebar } from '../components/common';
import useFetchPosts from '../hooks/useFetchPosts';

const Answer = () => {
  const navigate = useNavigate();
  useAuthRedirect(navigate);
  const { posts, refreshPosts, loading, error } = useFetchPosts();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center text-gray-600">
        <svg className="animate-spin h-6 w-6 mr-3 text-blue-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center text-red-500">
        Error loading posts: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex gap-x-1">
      <Sidebar />
      <div className="flex-1 py-5 overflow-hidden">
        <RecentPosts posts={posts} isPostTab={false} refreshPosts={refreshPosts} />
      </div>
    </div>
  );
};

export default Answer;