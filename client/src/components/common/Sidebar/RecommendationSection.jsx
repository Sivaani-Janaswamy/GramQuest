import React from 'react';
import useRecommendations from '../../../hooks/useRecommendations';

const RecommendationSection = () => {
  const { recommendations, loading, error } = useRecommendations();

  if (loading) return <p className="text-gray-500">Loading recommendations...</p>;
  if (error) return <p className="text-red-500">Error loading recommendations.</p>;
  if (!recommendations || recommendations.length === 0)
    return <p className="text-gray-500">No recommendations available.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-[#001A6E] font-semibold text-base">Recommended for You</h2>
      <ul className="space-y-2">
        {recommendations.map((post, idx) => (
          <li
            key={post.id || idx}
            className="text-[#074799] hover:underline hover:text-[#009990] cursor-pointer transition-colors"
          >
            • {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationSection;
