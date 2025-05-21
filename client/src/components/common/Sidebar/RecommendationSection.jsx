import React from 'react';
import { motion } from 'framer-motion';
import useRecommendations from '../../../hooks/useRecommendations';
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

const RecommendationSection = () => {
  const { recommendations, loading, error } = useRecommendations();

  if (loading) return <p className="text-gray-500">Loading recommendations...</p>;
  if (error) return <p className="text-red-500">Error loading recommendations.</p>;
  if (!recommendations || recommendations.length === 0)
    return <p className="text-gray-500">No recommendations available.</p>;

  return (
    <div className="space-y-4">
      <SectionTitle>Recommended for You</SectionTitle>
      <ul className="space-y-2">
        {recommendations.map((post, idx) => (
          <motion.li
            key={post.id || idx}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={cn(
              "text-gray-700 cursor-pointer transition-all duration-200"
            )}
          >
            • {post.title}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationSection;
