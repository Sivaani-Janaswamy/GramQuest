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

  const { login } = useAuth();

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
      setMessage('Signup successful!');

      login(formData.email, formData.password);
      localStorage.setItem('token', response.data.token);

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        setMessage('User data is not available.');
      }

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800">Create an Account</h2>
          <p className="mt-4 text-lg text-gray-600">Join us and start your journey.</p>
        </div>

        <Form inputs={inputs} buttonLabel="Sign Up" onSubmit={handleSubmit} />

        {message && (
          <p className={`mt-6 text-center text-md ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
