import React, { useState } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage('Both email and password are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      const { token, user } = response.data;

      setMessage('Login successful!');
      login(user.email, formData.password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id: user._id, name: user.name, email: user.email }));
    } catch (error) {
      if (error.response) {
        setMessage('Login failed. Please check your credentials.');
      } else {
        setMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">Sign In to Your Account</h2>
          <p className="mt-4 text-lg text-gray-600">Welcome back! Please enter your credentials.</p>
        </div>

        <Form inputs={inputs} buttonLabel="Login" onSubmit={handleSubmit} />

        {message && (
          <p className={`mt-6 text-center text-md ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
