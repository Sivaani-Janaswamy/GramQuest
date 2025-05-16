import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import Card from '../components/Card';
import PostHeader from '../components/PostHeader';
import PostContent from '../components/PostContent';
import { FaReply } from 'react-icons/fa';

// Helper to build nested reply tree
const buildReplyTree = (flat = []) => {
  const map = {};
  flat.forEach(r => (map[r._id] = { ...r, replies: [] }));
  const roots = [];
  flat.forEach(r => {
    const node = map[r._id];
    if (r.parentReplyId && map[r.parentReplyId]) {
      map[r.parentReplyId].replies.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
};

// Footer for replies (just shows timestamp and a Reply button)
const ReplyFooter = ({ onReplyClick, createdAt }) => (
  <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
    <span>{moment(createdAt).fromNow()}</span>
    <button
      onClick={onReplyClick}
      className="flex items-center text-blue-600 hover:underline"
    >
      <FaReply className="mr-1" /> Reply
    </button>
  </div>
);

// Recursive component rendering each reply as its own “post card”
const ReplyCard = ({ reply, postId, onAddReply, level = 0 }) => {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    if (!text.trim()) return alert('Reply can’t be empty');
    await onAddReply(reply._id, text);
    setText('');
    setShowForm(false);
  };

  return (
    <div style={{ marginLeft: level * 24 }} className="mb-4">
      <Card className="p-4">
        <PostHeader user={reply.user} />
        <PostContent
          post={{ title: '', body: reply.comment, attachments: [] }}
          showTitle={false}
        />
        <ReplyFooter
          createdAt={reply.createdAt}
          onReplyClick={() => setShowForm(!showForm)}
        />
      </Card>

      {showForm && (
        <div className="ml-6 mb-4">
          <textarea
            className="w-full p-2 border rounded"
            rows="2"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button
            onClick={handleSubmit}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      )}

      {reply.replies.map(child => (
        <ReplyCard
          key={child._id}
          reply={child}
          postId={postId}
          onAddReply={onAddReply}
          level={level + 1}
        />
      ))}
    </div>
  );
};

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [nestedReplies, setNestedReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [error, setError] = useState(null);

  const userId = JSON.parse(localStorage.getItem('user') || 'null')?.id;

  // Fetch post & replies
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPost(data);
        setNestedReplies(buildReplyTree(data.replies));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPost();
  }, [postId]);

  const handleAddReply = async (parentReplyId, comment) => {
    try {
      const { data } = await axios.post(
        `/api/posts/${postId}/reply`,
        { userId, comment, parentReplyId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setPost(data.post);
      setNestedReplies(buildReplyTree(data.post.replies));
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleTopLevelReply = () => handleAddReply(postId, newReply);

  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Main Post Card */}
      <Card className="p-6 mb-8">
        <PostHeader user={post.user} />
        <PostContent post={post} />
      </Card>

      {/* Replies Section */}
      <div className="space-y-4">
        {nestedReplies.length === 0 && (
          <p className="text-gray-500">No replies yet. Be the first to reply!</p>
        )}

        {nestedReplies.map(reply => (
          <ReplyCard
            key={reply._id}
            reply={reply}
            postId={postId}
            onAddReply={handleAddReply}
          />
        ))}

        {/* Top-level reply form */}
        <div className="mt-6">
          <textarea
            value={newReply}
            onChange={e => setNewReply(e.target.value)}
            placeholder="Write a reply..."
            className="w-full p-3 border rounded-lg"
          />
          <button
            onClick={handleTopLevelReply}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
