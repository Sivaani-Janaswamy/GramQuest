import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Profile from './pages/Profile';
import Post from './pages/Post';
import Answer from './pages/Answer';
import GSpace from './pages/GSpace';
import Quest from './pages/Quest';
import { useAuth } from './context/AuthContext';
import CreateGSpace from './pages/CreateGSpace';
import CommunityPage from './pages/CommunityPage';
import PostDetailPage from './pages/PostDetailPage';

const Home = () => <div className="p-4">Welcome Home</div>;

const App = () => {
  const [posts, setPosts] = useState([]);
  const { logout: authLogout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      } else {
        setPosts([]);
      }
    };

    fetchPosts();
  }, [isAuthenticated]);

  const handleLogout = () => {
    console.log('App.jsx: handleLogout called');
    authLogout(() => {
      setPosts([]);
      navigate('/login');
    });
  };

  const refreshPosts = async () => {
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
          console.error('Failed to refresh posts');
        }
      } catch (error) {
        console.error('Error refreshing posts:', error);
      }
    } else {
      setPosts([]);
    }
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post" element={<Post posts={posts} refreshPosts={refreshPosts} />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/gspaces" element={<GSpace />} />
        <Route path="/gspace/create" element={<CreateGSpace />} />
        <Route path="/gspace/:id" element={<CommunityPage />} />
        <Route path="/quests" element={<Quest />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
      </Routes>
    </>
  );
};

export default App;
