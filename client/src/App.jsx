import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile'; 
import Post from './pages/Post';
import Answer from './pages/Answer'; 

// Simple Home component as a placeholder
const Home = () => (
  <div className="p-4">
  </div>
);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* Navbar component visible on all pages */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/post" element={<Post />} />
          <Route path="/answer" element={<Answer />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
