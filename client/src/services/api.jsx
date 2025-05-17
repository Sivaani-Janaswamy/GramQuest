import axios from 'axios';

// Define your base URL here (adjust according to your backend)
const baseURL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000, // Optional timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor – adds token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor – handles unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
