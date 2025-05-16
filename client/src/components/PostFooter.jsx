import React, { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp } from 'react-icons/fa';
import moment from 'moment';
import ConfirmationModal from './ConfirmationModal';
import { Link } from 'react-router-dom'; // Import Link

const PostFooter = ({
  post,
  isPostTab,
  refreshPosts,
  isEditing,
  setIsEditing,
  editedPost,
  setEditedPost,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hasStarred, setHasStarred] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const isLoggedIn = () => !!localStorage.getItem('token');
  const getUserId = () => localStorage.getItem('userId');

  useEffect(() => {
    setHasStarred(post.stars?.includes(getUserId()) || false);
    setHasUpvoted(post.upvotes?.includes(getUserId()) || false);
  }, [post]);

  const handleAction = async (type) => {
    if (!isLoggedIn()) return alert('Login required');

    const active = type === 'star' ? hasStarred : hasUpvoted;
    const method = active ? 'DELETE' : 'PUT';
    const url = `http://localhost:3000/api/posts/${post._id}/${type}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error('Failed');

      refreshPosts();
      if (type === 'star') setHasStarred(!active);
      else setHasUpvoted(!active);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    setIsDeleteModalOpen(false);
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) throw new Error('Delete failed');
      refreshPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="text-sm text-gray-600 mt-5 space-y-2">
      <div className="flex justify-between items-center">
        <button
          onClick={() => handleAction('star')}
          className={`flex items-center hover:scale-105 transition ${
            hasStarred ? 'text-yellow-700' : 'text-yellow-500'
          }`}
        >
          <FaStar className="mr-2" />
          <span>{post.stars?.length || 0} Stars</span>
        </button>

        <button
          onClick={() => handleAction('upvote')}
          className={`flex items-center hover:scale-105 transition ${
            hasUpvoted ? 'text-blue-700' : 'text-blue-500'
          }`}
        >
          <FaThumbsUp className="mr-2" />
          <span>{post.upvotes?.length || 0} Upvotes</span>
        </button>

        <span>{moment(post.createdAt).fromNow()}</span>
      </div>

      <div className="mt-3">
        <div className="flex flex-wrap gap-3">
          <span className="font-medium text-gray-800">
            {post.replies?.length || 0} {post.replies?.length === 1 ? 'Reply' : 'Replies'}
          </span>

          <Link to={`/posts/${post._id}`}>  {/* Added Link here */}
            <button
              className="bg-teal-100 text-teal-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-200"
            >
              Reply
            </button>
          </Link>

          {isPostTab && !isEditing && (
            <>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditedPost({ title: post.title, body: post.body });
                }}
                className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-200"
              >
                Edit
              </button>

              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </>
          )}

          {isEditing && (
            <>
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(
                      `http://localhost:3000/api/posts/${post._id}`,
                      {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${localStorage.getItem(
                            'token'
                          )}`,
                        },
                        body: JSON.stringify(editedPost),
                      }
                    );
                    if (!res.ok) throw new Error('Failed to update');
                    setIsEditing(false);
                    refreshPosts();
                  } catch (e) {
                    alert(e.message);
                  }
                }}
                className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete the post "${post.title}"`}
        confirmText="Yes, Delete"
      />
    </div>
  );
};

export default PostFooter;
