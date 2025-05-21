import React from 'react';
import { motion } from 'framer-motion';
import useTrendingPosts from '../../../hooks/useTrendingPosts';
import cn from 'classnames';
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';

const listItemVariants = {
  hidden: { opacity: 0, y: -5, color: '#4B5563' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 }, color: '#4B5563' },
  hover: { scale: 1.02, backgroundColor: '#F5F5F5', color: '#007bff' },
};

const SectionTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-1.5">
    {children}
  </h2>
);

const TrendingSection = () => {
  const { trending, loading, error } = useTrendingPosts();

  if (loading) return (
    <div className="space-y-1.5">
      <div className="h-5 bg-gray-100 rounded-none w-3/4 animate-pulse"></div>
      <div className="h-3 bg-gray-100 rounded-none w-full animate-pulse"></div>
      <div className="h-3 bg-gray-100 rounded-none w-11/12 animate-pulse"></div>
      <div className="h-3 bg-gray-100 rounded-none w-4/5 animate-pulse"></div>
    </div>
  );
  if (error) return <p className="text-red-500 text-xs">Error loading trending posts.</p>;
  if (!trending || trending.length === 0)
    return <p className="text-gray-400 text-xs">No trending posts available.</p>;

  return (
    <div className="space-y-3">
      <SectionTitle>Trending Posts</SectionTitle>
      <ul className="space-y-1.5">
        {trending.map((post, idx) => (
          <motion.li
            key={post.id || idx}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={cn(
              "flex items-start cursor-pointer py-1 px-1.5 -mx-1.5",
              "transition-all duration-200 ease-in-out"
            )}
          >
            <span className="text-gray-400 font-mono text-xs mr-1.5 w-3 text-right flex-shrink-0">
              {idx + 1}.
            </span>
            <a href={`/posts/${post.id}`} className="block group flex-grow cursor-pointer">
              <span className="text-sm group-hover:text-blue-600 leading-tight">
                {post.title ?? 'Untitled'}
              </span>
              {post.views && (
                <div className="text-gray-400 text-xs mt-0.5 flex items-center">
                  <ArrowUpRightIcon className="h-3 w-3 mr-1" /> {post.views.toLocaleString()} views
                </div>
              )}
            </a>
          </motion.li>
        ))}
      </ul>
      {trending.length > 5 && (
        <a href="/trending" className="text-xs text-blue-500 hover:underline block text-right mt-3">
          Explore more &rarr;
        </a>
      )}
    </div>
  );
};

export default TrendingSection;