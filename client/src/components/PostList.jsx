import React, { useState } from 'react';
import Card from './Card';
import userPlaceholder from '../assets/user.png';
import { FaStar, FaThumbsUp } from 'react-icons/fa';
import moment from 'moment';
import ConfirmationModal from './ConfirmationModal'; // Ensure this path is correct

// Define PostHeader component first (or import it if it's in a separate file)
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

// Define PostContent component
const PostContent = ({ post }) => (
  <div>
    <h4 className="text-lg font-semibold mb-3 text-gray-900">{post.title}</h4>
    <p className="text-gray-700 mb-4">{post.body}</p>
    {post.attachments?.length > 0 && (
      <div className="text-teal-600 font-medium">Attachment added</div>
    )}
  </div>
);

// Define PostFooter component
const PostFooter = ({ post, isPostTab, refreshPosts }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  console.log(isPostTab);
  // Handle delete button click
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true); // Open the modal when delete button is clicked
  };

  // Handle confirmation of delete
  const handleConfirmDelete = async (postId) => {
    setIsDeleteModalOpen(false); // Close the modal after confirmation
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
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
      refreshPosts(); // Refresh posts after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(error.message || 'Failed to delete post');
    }
  };

  // Handle cancel action in modal
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false); // Close the modal if the user cancels
  };

  const handleEdit = () => {
    console.log('Edit clicked');
    // Implement edit functionality here
  };

  return (
    <div className="text-sm text-gray-600 mt-5 space-y-2">
      <div className="flex justify-between items-center">
        <button
          onClick={() => console.log('Star clicked')}
          className="flex items-center text-yellow-500 hover:scale-105 transition"
        >
          <FaStar className="mr-2" />
          <span>{post.stars?.length || 0} Stars</span>
        </button>

        <button
          onClick={() => console.log('Upvote clicked')}
          className="flex items-center text-blue-500 hover:scale-105 transition"
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

          {isPostTab && (
            <>
              <button
                onClick={handleEdit}
                className="text-sm px-4 py-2 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick} // Open the modal on click
                className="text-sm px-4 py-2 rounded bg-red-100 text-red-800 hover:bg-red-200 transition"
              >
                Delete
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={() => handleConfirmDelete(post._id)}
        message={`Are you sure you want to delete the post "${post.title}"`}
        confirmText="Yes, Delete"
      />
    </div>
  );
};


// Main PostList component
const PostList = ({ posts, isPostTab, refreshPosts }) => {
  return (
    <Card className="p-6">
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post._id}
              className="p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow bg-teal-50"
            >
              <PostHeader user={post.user} />
              <PostContent post={post} />
              <PostFooter
                post={post}
                isPostTab={isPostTab}
                refreshPosts={refreshPosts}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </Card>
  );
};

export default PostList;