import React from 'react';
import Card from './Card';

const PostList = ({ posts }) => {
  return (
    <Card>
      <h3 className="text-xl font-medium mb-4">Top Posts</h3>
      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
              <p>{post}</p>
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
