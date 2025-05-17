import { useState, useEffect } from 'react';
import api from '../services/api'; // Assuming you have an API client

const useTrendingPosts = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/trending'); // Replace with your actual API endpoint
        if (response.data && Array.isArray(response.data)) {
          setTrending(response.data);
        } else {
          setError('Failed to load trending posts: Invalid data format.');
        }
      } catch (err) {
        console.error('Error fetching trending posts:', err);
        setError('Failed to load trending posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  return { trending, loading, error };
};

export default useTrendingPosts;