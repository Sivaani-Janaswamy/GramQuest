import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct usage

const Post = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit handler triggered"); // ✅ Debug log

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
      setError('You must be logged in to post a question.');
      return;
    }

    // Token Expiry Check
    try {
      const decodedToken = jwtDecode(token); // ✅ Correct function name
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        setError('Token has expired. Please log in again.');
        return;
      }
    } catch (err) {
      setError('Invalid token.');
      return;
    }

    if (!title.trim() || !body.trim()) {
      setError('Both title and body are required');
      return;
    }

    const postData = new FormData();
    postData.append('title', title);
    postData.append('body', body);
    postData.append('userId', user.id);
    files.forEach((file) => postData.append('attachments', file));

    try {
      const response = await axios.post('/api/posts', postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Post created:', response.data);

      setTitle('');
      setBody('');
      setFiles([]);
      setError('');
      setSuccessMessage('Question posted successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to post question');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Post a Question</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold">Title</label>
            <input
              id="title"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your question title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-gray-700 font-semibold">Body</label>
            <textarea
              id="body"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your detailed question"
              rows="6"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="attachments" className="block text-gray-700 font-semibold">Attachments</label>
            <input
              id="attachments"
              type="file"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              multiple
              onChange={handleFileChange}
            />
            {files.length > 0 && (
              <div className="mt-2 text-sm text-gray-500">
                <h3>Selected Files:</h3>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
