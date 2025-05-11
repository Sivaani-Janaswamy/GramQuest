import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthRedirect from '../hooks/useAuthRedirect';
import PostForm from '../components/PostForm';
import RecentPosts from '../components/RecentPosts';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useAuthRedirect(navigate);

  useEffect(() => {
    const fetchUser = () => {
      const loggedUser = JSON.parse(localStorage.getItem('user'));
      if (loggedUser) {
        setUser(loggedUser);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
        console.error('Error fetching posts:', err);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  const userPosts = posts
    .filter((post) => {
      const postUserId =
        typeof post.user === 'object' && post.user !== null
          ? post.user._id
          : post.user;
      return user && postUserId === user.id;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleLogout = () => {
    const confirmation = window.confirm('Are you sure you want to logout?');
    if (confirmation) {
      localStorage.removeItem('user');
      setUser(null);
      setPosts([]);
    }
  };

  return (
<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto space-y-16">
    <PostForm posts={posts} setPosts={setPosts} />

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
        <p className="text-gray-600 px-2">You haven’t posted anything yet.</p>
      ) : (
        <RecentPosts posts={userPosts} isPostTab={true} />
      )}
    </div>
  </div>
</div>

  );
};

export default Post;
