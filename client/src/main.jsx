import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <Router>
      <App />
      </Router>
    </AuthProvider>
  </StrictMode>
);
