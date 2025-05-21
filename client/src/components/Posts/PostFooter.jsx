import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
// --- UPDATED ICON IMPORTS ---
import {
  Star,          // Used for both active (filled) and inactive (outline) star
  ThumbsUp,      // Used for both active (filled) and inactive (outline) upvote
  MessageCircle, // For comments/replies
  Edit,          // Simpler edit icon
  Trash2,        // For delete
  Save,          // For save
  X              // For cancel
} from 'lucide-react';
// --- END UPDATED ICON IMPORTS ---
import { Confirmation } from '../common';
import PostAdminActions from './PostAdminActions'; // Assuming these components handle their own icons/styling
import PostEditActions from './PostEditActions';   // Assuming these components handle their own icons/styling
import usePostAction from '../../hooks/usePostAction';

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
  const getUserId = () => localStorage.getItem('userId');
  const { handleAction, handleDelete, handleUpdate } = usePostAction(post._id, refreshPosts);

  useEffect(() => {
    setHasStarred(post.stars?.includes(getUserId()) || false);
    setHasUpvoted(post.upvotes?.includes(getUserId()) || false);
  }, [post]);

  return (
    <div className="text-sm text-gray-600 mt-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          {/* Star Action */}
          <div
            className="flex items-center gap-1 cursor-pointer transition-colors duration-200 ease-in-out"
            onClick={() => handleAction('star', hasStarred, setHasStarred)}
          >
            {/* Conditional rendering for filled/outline star and color */}
            {hasStarred ? (
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            ) : (
              <Star className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            )}
            <span className={hasStarred ? "text-yellow-600 font-medium" : "text-gray-600"}>
              {post.stars?.length || 0}
            </span>
          </div>

          {/* Upvote Action */}
          <div
            className="flex items-center gap-1 cursor-pointer transition-colors duration-200 ease-in-out"
            onClick={() => handleAction('upvote', hasUpvoted, setHasUpvoted)}
          >
            {/* Conditional rendering for filled/outline thumbs-up and color */}
            {hasUpvoted ? (
              <ThumbsUp className="w-5 h-5 text-blue-500 fill-current" />
            ) : (
              <ThumbsUp className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            )}
            <span className={hasUpvoted ? "text-blue-600 font-medium" : "text-gray-600"}>
              {post.upvotes?.length || 0}
            </span>
          </div>

          {/* Comments/Reply Link */}
          <Link
            to={`/posts/${post._id}`}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 ease-in-out"
          >
            <MessageCircle className="w-5 h-5" />
            <span>
              {post.replies?.length > 0
                ? `${post.replies.length} ${post.replies.length === 1 ? 'Comment' : 'Comments'}`
                : 'No Comments Yet'}
            </span>
          </Link>
        </div>

        {/* Timestamp */}
        <span className="text-gray-400 text-xs">{moment(post.createdAt).fromNow()}</span>
      </div>

      <div className="flex gap-3 mt-2">
        {/* Admin Actions (Edit and Delete) */}
        {isPostTab && !isEditing && (
          <>
            <Edit
              className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-in-out"
              onClick={() => {
                setIsEditing(true);
                setEditedPost({ title: post.title, body: post.body });
              }}
            />
            <Trash2
              className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </>
        )}

        {/* Edit Actions (Save and Cancel) */}
        {isEditing && (
          <>
            <Save
              className="w-5 h-5 cursor-pointer text-green-500 hover:text-green-700 transition-colors duration-200 ease-in-out"
              onClick={async () => {
                const success = await handleUpdate(editedPost);
                if (success) setIsEditing(false);
              }}
            />
            <X
              className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200 ease-in-out"
              onClick={() => setIsEditing(false)}
            />
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      <Confirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete the post "${post.title}"?`}
        confirmText="Yes, Delete"
      />
    </div>
  );
};

export default PostFooter;