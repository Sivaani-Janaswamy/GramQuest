import React from 'react';
import { motion } from 'framer-motion';
import useRecommendations from '../../../hooks/useRecommendations';
import cn from 'classnames';

const listItemVariants = {
  hidden: { opacity: 0, y: -5, color: '#4B5563'},
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 }, color: '#4B5563' },
  hover: { scale: 1.02, backgroundColor: '#F5F5F5', color: '#007bff' },
};

const SectionTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-1.5">
    {children}
  </h2>
);

const RecommendationSection = () => {
  const { recommendations, loading, error } = useRecommendations();

  if (loading) return (
    <div className="space-y-1.5">
      <div className="h-5 bg-gray-100 rounded-none w-3/4 animate-pulse"></div>
      <div className="h-3 bg-gray-100 rounded-none w-full animate-pulse"></div>
      <div className="h-3 bg-gray-100 rounded-none w-11/12 animate-pulse"></div>
      <div className="h-3 bg-gray-100 rounded-none w-4/5 animate-pulse"></div>
    </div>
  );
  if (error) return <p className="text-red-500 text-xs">Error loading recommendations.</p>;
  if (!recommendations || recommendations.length === 0)
    return <p className="text-gray-400 text-xs">No recommendations available.</p>;

  return (
    <div className="space-y-3">
      <SectionTitle>Recommended for You</SectionTitle>
      <ul className="space-y-1.5">
        {recommendations.map((post, idx) => (
          <motion.li
            key={post.id || idx}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={cn(
              "cursor-pointer py-1 px-1.5 -mx-1.5",
              "transition-all duration-200 ease-in-out"
            )}
          >
            <a href={`/posts/${post.id}`} className="block group">
              <span className="text-sm group-hover:text-blue-600">
                {post.title ?? 'Untitled'}
              </span>
              {post.description && (
                <p className="text-gray-400 text-xs mt-0.5 leading-tight group-hover:text-blue-400">
                  {post.description.substring(0, 100)}{post.description.length > 100 ? '...' : ''}
                </p>
              )}
            </a>
          </motion.li>
        ))}
      </ul>
      {recommendations.length > 5 && (
        <a href="/recommendations" className="text-xs text-blue-500 hover:underline block text-right mt-3">
          View all recommendations &rarr;
        </a>
      )}
    </div>
  );
};

export default RecommendationSection;