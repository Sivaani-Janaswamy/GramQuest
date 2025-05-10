import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const PostForm = ({ posts, setPosts }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
      setError('You must be logged in to post a question.');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        setError('Token expired. Please log in again.');
        return;
      }
    } catch {
      setError('Invalid token.');
      return;
    }

    if (!title.trim() || !body.trim()) {
      setError('Both title and body are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('userId', user.id);
    files.forEach((file) => formData.append('attachments', file));

    try {
      const response = await axios.post('/api/posts', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTitle('');
      setBody('');
      setFiles([]);
      setError('');
      setSuccessMessage('Question posted successfully!');
      setPosts([...posts, response.data]); // Add the new post to the posts list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post question.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-10">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Post a Question</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-semibold text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500"
            placeholder="Enter your question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="body" className="block font-semibold text-gray-700">Body</label>
          <textarea
            id="body"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500"
            rows="6"
            placeholder="Enter your detailed question"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="attachments" className="block font-semibold text-gray-700">Attachments</label>
          <input
            id="attachments"
            type="file"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500"
            multiple
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              <h3>Selected Files:</h3>
              <ul>{files.map((f, i) => <li key={i}>{f.name}</li>)}</ul>
            </div>
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Post Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
