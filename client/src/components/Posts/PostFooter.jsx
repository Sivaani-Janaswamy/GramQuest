import { useState, useEffect } from 'react';
import moment from 'moment';
import {Confirmation} from '../common';
import { Link } from 'react-router-dom';
import PostActionButton from './PostActionButton';
import PostAdminActions from './PostAdminActions';
import PostEditActions from './PostEditActions';
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
  }, [post, getUserId]);

  return (
    <div className="text-sm text-gray-600 mt-5 space-y-2">
      <div className="flex justify-between items-center">
        <PostActionButton
          type="star"
          active={hasStarred}
          count={post.stars?.length}
          onClick={() => handleAction('star', hasStarred, setHasStarred)}
        />
        <PostActionButton
          type="upvote"
          active={hasUpvoted}
          count={post.upvotes?.length}
          onClick={() => handleAction('upvote', hasUpvoted, setHasUpvoted)}
        />
        <span>{moment(post.createdAt).fromNow()}</span>
      </div>

      <div className="mt-3">
        <div className="flex flex-wrap gap-3">
          <span className="font-medium text-gray-800">
            {post.replies?.length || 0} {post.replies?.length === 1 ? 'Reply' : 'Replies'}
          </span>

          <Link to={`/posts/${post._id}`}>
            <button
              className="bg-teal-100 text-teal-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal-200"
            >
              Reply
            </button>
          </Link>

          {isPostTab && !isEditing && (
            <PostAdminActions
              onEditClick={() => {
                setIsEditing(true);
                setEditedPost({ title: post.title, body: post.body });
              }}
              onDeleteClick={() => setIsDeleteModalOpen(true)}
            />
          )}

          {isEditing && (
            <PostEditActions
              onSaveClick={async () => {
                const success = await handleUpdate(editedPost);
                if (success) setIsEditing(false);
              }}
              onCancelClick={() => setIsEditing(false)}
            />
          )}
        </div>
      </div>

      <Confirmation
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