import React from 'react';
import Card from './Card';

const PostList = ({ posts }) => {
  return (
    <Card>
      <h3 className="text-xl font-medium mb-4">Top Posts</h3>
      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow-md">
              <div className="flex items-center mb-3">
                <img
                  src={post.user.profilePic || '../assets/user.png'}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{post.user.name}</p>
                  <p className="text-sm text-gray-500">{post.user.email}</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
              <p className="text-gray-700 mb-4">{post.body}</p>

              {post.attachments && post.attachments.length > 0 && (
                <div className="space-y-2">
                  {post.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Attachment {index + 1}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No posts available.</p>
      )}
    </Card>
  );
};

export default PostList;
