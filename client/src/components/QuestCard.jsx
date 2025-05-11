import React from 'react';
import { FaUsers, FaStar } from 'react-icons/fa'; // Font Awesome icons

const QuestCard = ({ title, description, membersCount, stars, tags, backgroundImage }) => {
  return (
    <div
      className={`relative w-[300px] h-[200px] rounded-[10px] flex items-center justify-center overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rotate-[-5deg] hover:scale-110 hover:shadow-2xl group`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : 'linear-gradient(to bottom right, #eaff02, #62d603)', // Set gradient here as fallback
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Title Badge (Always visible) */}
      <p className="absolute top-4 left-4 px-3 py-1 bg-blue-950/90 text-white text-base font-semibold tracking-wide rounded-md z-10 shadow-md group-hover:scale-0 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
        {title}
      </p>

      {/* Front side badges */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        {/* Members Count Badge */}
        <div className="flex items-center px-3 py-1 bg-blue-950/80 text-white text-xs rounded-full shadow-md">
          <FaUsers className="mr-1 text-sm" /> {membersCount} Members
        </div>

        {/* Stars Badge */}
        <div className="flex items-center px-3 py-1 bg-blue-950/80 text-white text-xs rounded-full shadow-md">
          <FaStar className="mr-1 text-sm" /> {stars} Stars
        </div>

        {/* Tags Badge */}
        {tags && tags.map((tag, index) => (
          <div key={index} className="px-3 py-1 bg-blue-950/80 text-white text-xs rounded-full shadow-md">
            #{tag}
          </div>
        ))}
      </div>

      {/* Details on hover */}
      <div className="absolute top-1/2 left-1/2 w-full h-full p-5 box-border bg-white opacity-0 -rotate-45 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-0 group-hover:opacity-100">
        <p className="text-xl font-bold text-[#333] mb-2">{title}</p>
        <p className="text-sm text-[#777] leading-relaxed mb-4">{description}</p>
        <button className="mt-auto px-4 py-2 bg-pink-600 text-white text-sm rounded-md shadow hover:bg-pink-700 transition-colors">
          Join Quest
        </button>
      </div>
    </div>
  );
};

export default QuestCard;
