import React from 'react';
import PostList from './PostList';

const RecentPosts = ({ posts }) => (
  <div className="max-w-4xl mx-auto">
    <PostList posts={posts} />
  </div>
);

export default RecentPosts;
