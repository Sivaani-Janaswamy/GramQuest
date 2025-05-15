import React, { useState } from 'react';
import Card from './Card';
import userPlaceholder from '../assets/user.png';
import { FaStar, FaThumbsUp } from 'react-icons/fa';
import moment from 'moment';
import ConfirmationModal from './ConfirmationModal';
import { useEffect } from 'react';


const PostHeader = ({ user }) => (
  <div className="flex items-center mb-4">
    <img
      src={user?.profilePic && user.profilePic !== "https://via.placeholder.com/100"
        ? user.profilePic
        : userPlaceholder}
      alt={user?.name || 'User'}
      className="w-12 h-12 rounded-full mr-4"
    />
    <div>
      <p className="font-semibold text-gray-900">{user?.name || 'Unknown'}</p>
      <p className="text-sm text-gray-600">{user?.email || 'N/A'}</p>
    </div>
  </div>
);

const PostContent = ({ post, isEditing, editedPost, setEditedPost }) => (
  <div>
    {isEditing ? (
      <>
        <input
          type="text"
          value={editedPost.title}
          onChange={(e) => setEditedPost((prev) => ({ ...prev, title: e.target.value }))} 
          className="w-full border border-gray-300 p-2 rounded mb-2"
        />
        <textarea
          value={editedPost.body}
          onChange={(e) => setEditedPost((prev) => ({ ...prev, body: e.target.value }))} 
          className="w-full border border-gray-300 p-2 rounded mb-2"
        />
      </>
    ) : (
      <>
        <h4 className="text-lg font-semibold mb-3 text-gray-900">{post.title}</h4>
        <p className="text-gray-700 mb-4">{post.body}</p>
        {post.attachments?.length > 0 && (
          <div className="text-teal-600 font-medium">Attachment added</div>
        )}
      </>
    )}
  </div>
);


const PostFooter =  ({
  post,
  isPostTab,
  refreshPosts,
  isEditing,
  setIsEditing,
  editedPost,
  setEditedPost
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hasStarred, setHasStarred] = useState(post.stars?.includes(localStorage.getItem('userId')) || false);
  const [hasUpvoted, setHasUpvoted] = useState(post.upvotes?.includes(localStorage.getItem('userId')) || false);

  const isLoggedIn = () => !!localStorage.getItem('token');
  const getUserId = () => localStorage.getItem('userId');

  useEffect(() => {
    if (isLoggedIn()) {
      setHasStarred(post.stars?.includes(getUserId()) || false);
      setHasUpvoted(post.upvotes?.includes(getUserId()) || false);
    } else {
      setHasStarred(false);
      setHasUpvoted(false);
    }
  }, [post.stars, post.upvotes, isLoggedIn, getUserId]);

  const handleAction = async (actionType) => {
    if (!isLoggedIn()) {
      alert('You need to log in to give a star or upvote.');
      return;
    }

    const isCurrentlyActive = actionType === 'star' ? hasStarred : hasUpvoted;
    const method = isCurrentlyActive ? 'DELETE' : 'PUT';
    const backendAction = actionType === 'star' && isCurrentlyActive ? 'star' :
                           actionType === 'upvote' && isCurrentlyActive ? 'upvote' : actionType;
    const backendUrlAction = isCurrentlyActive ? backendAction : actionType;
    console.log('isCurrentlyActive:', isCurrentlyActive);
    console.log('method:', method);
    console.log('backendUrlAction:', backendUrlAction);
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${post._id}/${backendUrlAction}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        // Removed the body for DELETE requests
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isCurrentlyActive ? 'remove' : ''} ${actionType}`);
      }
      console.log(`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} ${isCurrentlyActive ? 'removed' : 'added'} successfully`);
       refreshPosts();
      if (actionType === 'star') {
        setHasStarred(!hasStarred);
      } else if (actionType === 'upvote') {
        setHasUpvoted(!hasUpvoted);
      }
    } catch (error) {
      console.error(`Error during ${actionType}:`, error);
      alert(error.message || `Failed to ${isCurrentlyActive ? 'remove' : ''} ${actionType}`);
    }
  };

  const handleDeleteClick = () => setIsDeleteModalOpen(true);
  const handleCancelDelete = () => setIsDeleteModalOpen(false);

  const handleConfirmDelete = async () => {
    setIsDeleteModalOpen(false);
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post');
      }

      refreshPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(error.message || 'Failed to delete post');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPost({ title: post.title, body: post.body });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedPost)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }

      setIsEditing(false);
      refreshPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      alert(error.message || 'Failed to update post');
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
        <div className="flex items-center flex-wrap gap-3">
          <span className="font-medium text-gray-800">
            {post.replies?.length || 0} {post.replies?.length === 1 ? 'Reply' : 'Replies'}
          </span>

          <button
            onClick={() => console.log('Reply clicked')}
            className="bg-teal-100 text-teal-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-200 transition-all"
          >
            Reply
          </button>

          {isPostTab && !isEditing && (
            <>
              <button
                onClick={handleEdit}
                className="text-sm px-4 py-2 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="text-sm px-4 py-2 rounded bg-red-100 text-red-800 hover:bg-red-200 transition"
              >
                Delete
              </button>
            </>
          )}

          {isEditing && (
            <>
              <button
                onClick={handleSave}
                className="text-sm px-4 py-2 rounded bg-green-100 text-green-800 hover:bg-green-200 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {post.replies?.length > 0 && (
          <ul className="space-y-2 mt-3 pl-4">
            {post.replies.map((reply, index) => (
              <li key={index} className="bg-teal-50 p-3 rounded-md shadow-sm">
                <p className="font-semibold text-gray-800">{reply.user?.name || 'Anonymous'}</p>
                <p>{reply.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the post "${post.title}"`}
        confirmText="Yes, Delete"
      />
    </div>
  );
};


const PostList = ({ posts, isPostTab, refreshPosts }) => {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPost, setEditedPost] = useState({ title: '', body: '' });

  return (
    <Card className="p-6">
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => {
            const isEditing = editingPostId === post._id;
            return (
              <li
                key={post._id}
                className="p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow bg-teal-50"
              >
                <PostHeader user={post.user} />
                <PostContent
                  post={post}
                  isEditing={isEditing}
                  editedPost={editedPost}
                  setEditedPost={setEditedPost}
                />
                <PostFooter
                  post={post}
                  isPostTab={isPostTab}
                  refreshPosts={refreshPosts}
                  isEditing={isEditing}
                  setIsEditing={(editing) =>
                    setEditingPostId(editing ? post._id : null)
                  }
                  editedPost={editedPost}
                  setEditedPost={setEditedPost}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </Card>
  );
};

export default PostList;
