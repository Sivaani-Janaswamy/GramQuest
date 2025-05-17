import { useState, useEffect } from 'react';
import api from '../services/api'; // Assuming you have an API client

const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/recommendations'); // Replace with your actual API endpoint
        if (response.data && Array.isArray(response.data)) {
          setRecommendations(response.data);
        } else {
          setError('Failed to load recommendations: Invalid data format.');
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return { recommendations, loading, error };
};

export default useRecommendations;