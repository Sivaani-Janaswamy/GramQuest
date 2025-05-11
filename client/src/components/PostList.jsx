import React from 'react';
import Card from './Card';
import userPlaceholder from '../assets/user.png';
import { FaStar, FaThumbsUp } from 'react-icons/fa';
import moment from 'moment';

const PostList = ({ posts, isPostTab }) => {
  return (
    <Card className="p-6">
      {posts.length > 0 ? (
        <ul className="space-y-6">
          {posts.map((post, index) => (
            <li
              key={index}
              className="p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow bg-teal-50"
            >
              <PostHeader user={post.user} />
              <PostContent post={post} />
              {/* ✅ Pass isPostTab */}
              <PostFooter post={post} isPostTab={isPostTab} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </Card>
  );
};

const PostHeader = ({ user }) => {
  return (
    <div className="flex items-center mb-4">
      <img
        src={user?.profilePic && user.profilePic !== "https://via.placeholder.com/100" ? user.profilePic : userPlaceholder}
        alt={user?.name || 'User'}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <p className="font-semibold text-gray-900">{user?.name || 'Unknown'}</p>
        <p className="text-sm text-gray-600">{user?.email || 'N/A'}</p>
      </div>
    </div>
  );
};

const PostContent = ({ post }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-3 text-gray-900">{post.title}</h4>
      <p className="text-gray-700 mb-4">{post.body}</p>

      {post.attachments && post.attachments.length > 0 && (
        <div className="text-teal-600 font-medium">
          Attachment added
        </div>
      )}
    </div>
  );
};

const PostFooter = ({ post, isPostTab }) => {
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

      {/* Replies + Buttons Row */}
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
                onClick={() => console.log('Edit clicked')}
                className="text-sm px-4 py-2 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
              >
                Edit
              </button>
              <button
                onClick={() => console.log('Delete clicked')}
                className="text-sm px-4 py-2 rounded bg-red-100 text-red-800 hover:bg-red-200 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>

        {post.replies && post.replies.length > 0 && (
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
    </div>
  );
};


export default PostList;
