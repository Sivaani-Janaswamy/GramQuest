import React from 'react';
import { motion } from 'framer-motion';
import useTrendingPosts from '../../../hooks/useTrendingPosts';
import cn from 'classnames';

// Reusable animation variants
const listItemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  hover: { scale: 1.03, color: '#007BFF' },
};

const SectionTitle = ({ children }) => (
    <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        {children}
    </h2>
);

const TrendingSection = () => {
  const { trending, loading, error } = useTrendingPosts();

  if (loading) return <p className="text-gray-500">Loading trending posts...</p>;
  if (error) return <p className="text-red-500">Error loading trending posts.</p>;
  if (!trending || trending.length === 0)
    return <p className="text-gray-500">No trending posts available.</p>;

  return (
    <div className="space-y-4">
      <SectionTitle>Trending Posts</SectionTitle>
      <ul className="space-y-3">
        {trending.map((post, idx) => (
          <motion.li
            key={post.id || idx}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={cn(
              "flex items-start justify-between text-gray-700 transition-all duration-200"
            )}
          >
            <span className="cursor-pointer  ">{post.title ?? 'Untitled'}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSection;
