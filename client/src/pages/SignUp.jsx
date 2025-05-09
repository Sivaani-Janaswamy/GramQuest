import React, { useState } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const { login } = useAuth(); // Use the login function from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', formData);
      console.log(response.data);
      setMessage('Signup successful!');

      // Automatically login after signup
      login(formData.email, formData.password);

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Optionally store user info if needed, or leave it to AuthContext
      if (response.data.user) {
        // Only store user data in context if you want to use it across components
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        setMessage('User data is not available.');
      }

      // Reset form data after successful signup
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Signup failed. Please check your information.');
    }
  };

  const inputs = [
    {
      type: 'text',
      name: 'name',
      value: formData.name,
      onChange: handleChange,
      placeholder: 'Name',
      required: true,
    },
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
    {
      type: 'password',
      name: 'confirmPassword',
      value: formData.confirmPassword,
      onChange: handleChange,
      placeholder: 'Confirm Password',
      required: true,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
        <Form inputs={inputs} buttonLabel="Sign Up" onSubmit={handleSubmit} />
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
