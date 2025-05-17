import React from 'react';
import Navbar from './components/layout/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import { usePostData } from './hooks/usePostData'; 

const App = () => {
  const { logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const { posts, refreshPosts } = usePostData();

  const handleLogout = () => {
    console.log('App.jsx: handleLogout called');
    authLogout(() => {
      navigate('/login');
    });
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <AppRoutes />
    </>
  );
};

export default App;