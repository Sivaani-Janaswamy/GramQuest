import React, { useState } from 'react';
import axios from 'axios';
import Form from '../components/Form'; // Assuming you have a reusable Form component
import { useAuth } from '../context/AuthContext'; // Assuming AuthContext is set up properly

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState(''); // Message for success/error feedback

  const { login } = useAuth(); // Access the login function from AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.email || !formData.password) {
      setMessage('Both email and password are required.');
      return;
    }

    try {
      // Make API call to login endpoint
      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      console.log('Response data:', response.data); // Log the response from the server

      // Extract token and user from response
      const { token, user } = response.data;

      // Handle successful login
      setMessage('Login successful!');
      login(user.email, formData.password); // Update AuthContext
      localStorage.setItem('token', token); // Store token
      localStorage.setItem('user', JSON.stringify({ id: user._id, name: user.name, email: user.email })); // Store user info

    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        console.error('Error Response:', error.response.data);
        console.error('Error Status:', error.response.status);
        setMessage('Login failed. Please check your credentials.');
      } else {
        setMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

  // Inputs for the form
  const inputs = [
    {
      type: 'email',
      name: 'email',
      value: formData.email,
      onChange: handleChange,
      placeholder: 'Email',
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      value: formData.password,
      onChange: handleChange,
      placeholder: 'Password',
      required: true,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form inputs={inputs} buttonLabel="Login" onSubmit={handleSubmit} />
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
