import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const usePostData = () => {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated } = useAuth();

  const fetchPosts = async () => {
    if (isAuthenticated) {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
          setPosts([]); // Clear posts on failure
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]); // Clear posts on error
      }
    } else {
      setPosts([]);
    }
  };

  const refreshPosts = async () => {
    await fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, [isAuthenticated]);

  return { posts, refreshPosts };
};