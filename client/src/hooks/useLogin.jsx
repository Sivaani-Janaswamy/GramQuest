import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useLogin = () => {
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage('Both email and password are required.');
      setLoading(false);
      return false;
    }

    try {
      await login(email, password);  // Use AuthContext login method
      setMessage('Login successful!');

      // Navigate after successful login
      setTimeout(() => {
        navigate('/');
      }, 2000);

      return true;
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Login failed. Please try again.');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { message, handleLogin, loading };
};

export default useLogin;
