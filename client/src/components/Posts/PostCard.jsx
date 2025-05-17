import { useState } from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';

const PostCard = ({ post, isPostTab, refreshPosts }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ title: '', body: '' });

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-6">
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
        setIsEditing={setIsEditing}
        editedPost={editedPost}
        setEditedPost={setEditedPost}
        
      />
    </div>
  );
};

export default PostCard;
