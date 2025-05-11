import React from 'react';
import { useNavigate } from 'react-router-dom';

const GSpaceCard = ({ title, description, tags }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/gspace/create');
  };

  return (
    <div
      onClick={handleClick}
      className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition duration-300"
      style={{ backgroundColor: '#E1FFBB' }}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-[#001A6E]">{title}</div>
        <p className="text-[#074799] text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
            style={{
              backgroundColor: '#009990',
              color: 'white'
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GSpaceCard;
