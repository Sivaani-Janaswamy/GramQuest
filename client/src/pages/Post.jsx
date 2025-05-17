import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthRedirect from '../hooks/useAuthRedirect';
import { PostForm, RecentPosts } from '../components/Posts';
import { jwtDecode } from 'jwt-decode';

const Post = ({ posts, refreshPosts }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useAuthRedirect(navigate);

  useEffect(() => {
    const fetchUser = () => {
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const decoded = jwtDecode(parsedUser.token); 

      const isExpired = decoded.exp * 1000 < Date.now(); 
      if (isExpired) {
        setError('Session expired. Please log in again.');
        localStorage.removeItem('user');
        setUser(null);
        return;
      }

      setUser(parsedUser);
    }
  } catch (err) {
    setError('Failed to parse user data.');
  }
  finally {
        setLoading(false); 
      }
};
  }, []);

  const userPosts = (Array.isArray(posts) ? posts : [])
    .filter((post) => {
      const postUserId =
        typeof post.user === 'object' && post.user !== null
          ? post.user._id
          : post.user;
      return user && postUserId === user.id;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Post Creation Form */}
        <PostForm posts={posts} setPosts={() => {}} /> {/* App.js handles setPosts */}

        {/* User Posts Section */}
        <div className="w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-left px-33">
            Your Previous Posts
          </h2>

          {!user ? (
            <p className="text-red-600 px-2">You need to login to see your posts.</p>
          ) : loading ? (
            <p className="px-2">Loading posts...</p>
          ) : error ? (
            <p className="text-red-600 px-2">{error}</p>
          ) : userPosts.length === 0 ? (
            <p className="text-gray-600 px-33">You haven’t posted anything yet.</p>
          ) : (
            <RecentPosts posts={userPosts} isPostTab={true} refreshPosts={refreshPosts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
