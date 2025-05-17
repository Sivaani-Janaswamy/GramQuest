import React, { useState } from 'react';
import { Form } from '../components/common';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

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
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMessage('Signup successful! Redirecting...');
      
      // delay navigation to homepage for 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);

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
