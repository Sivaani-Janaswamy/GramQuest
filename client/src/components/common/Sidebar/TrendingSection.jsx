import React from 'react';
import useTrendingPosts from '../../../hooks/useTrendingPosts';

const TrendingSection = () => {
  const { trending, loading, error } = useTrendingPosts();

  if (loading) return <p className="text-gray-500">Loading trending posts...</p>;
  if (error) return <p className="text-red-500">Error loading trending posts.</p>;
  if (!trending || trending.length === 0)
    return <p className="text-gray-500">No trending posts available.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-[#001A6E] font-semibold text-base">Trending Posts</h2>
      <ul className="space-y-3">
        {trending.map((post, idx) => (
          <li key={post.id || idx} className="flex items-start justify-between">
            <span className="text-[#074799] hover:underline hover:text-[#009990] cursor-pointer transition-colors">
              {post.title ?? 'Untitled'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSection;
