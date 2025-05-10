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
  const [error, setError] = useState(null); // Error state for API calls
  const navigate = useNavigate();

  // Custom hook for redirecting if user is not authenticated
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
        setLoading(false); // Stop loading once posts are fetched
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
      setPosts([]); // Reset posts on logout
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto mb-10">
        <PostForm posts={posts} setPosts={setPosts} />
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your Previous Posts</h2>

        {!user ? (
          <p className="text-red-600">You need to login to see your posts.</p>
        ) : loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p> // Display error message
        ) : userPosts.length === 0 ? (
          <p className="text-gray-600">You haven’t posted anything yet.</p>
        ) : (
          <RecentPosts posts={userPosts} />
        )}
      </div>

    </div>
  );
};

export default Post;
