import React from 'react';
import { Link } from 'react-router-dom';
import { RocketLaunchIcon, LightBulbIcon, UsersIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  return (
    <div className="bg-gray-100 py-16">
      <header className="bg-indigo-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Awesome Platform!</h1>
          <p className="text-xl mb-8">Connect, Learn, and Grow with our community.</p>
          <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full">
            Get Started
          </Link>
        </div>
      </header>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
              <RocketLaunchIcon className="mx-auto h-12 w-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Access</h3>
              <p className="text-gray-600">Join our platform and get immediate access to a wealth of information and resources.</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
              <LightBulbIcon className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Share Your Ideas</h3>
              <p className="text-gray-600">Contribute your thoughts, ask questions, and engage in meaningful discussions with others.</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
              <UsersIcon className="mx-auto h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Support</h3>
              <p className="text-gray-600">Connect with a supportive community of like-minded individuals and expand your network.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Ready to Dive In?</h2>
          <p className="text-xl text-gray-600 mb-8">Explore the platform and discover the possibilities.</p>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mr-4">
            Login
          </Link>
          <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full">
            Sign Up
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <p>&copy; 2025 Your Awesome Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;