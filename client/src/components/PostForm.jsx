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
      setPosts([...posts, response.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post question.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-10 rounded-2xl shadow-2xl mb-12 bg-white border border-gray-200">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Post a Question</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-600 text-center mb-4">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold mb-2 text-blue-900">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            placeholder="e.g. How to implement JWT in React?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-semibold mb-2 text-blue-900">
            Body
          </label>
          <textarea
            id="body"
            rows="5"
            className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            placeholder="Include all relevant details, code snippets, or context here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="attachments" className="block text-sm font-semibold mb-2 text-blue-900">
            Attachments (optional)
          </label>
          <input
            id="attachments"
            type="file"
            className="w-full p-3 rounded-xl border border-gray-300 bg-white"
            multiple
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <div className="mt-3 text-sm text-gray-700">
              <strong>Selected Files:</strong>
              <ul className="list-disc ml-6 mt-1">
                {files.map((f, i) => (
                  <li key={i}>{f.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-gradient-to-r from-teal-500 to-lime-500 hover:from-teal-600 hover:to-lime-600 rounded-xl font-semibold shadow-md transition-all duration-200"
          >
            Post Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
