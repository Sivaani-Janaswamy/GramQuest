import React from 'react';
import { Star } from 'lucide-react';

// Simple reusable Card and CardContent components
const Card = ({ children, className }) => (
  <div className={`${className} py-4 px-5 rounded-xl`}>
    {children}
  </div>
);

const Sidebar = () => {
  const recommendations = [
    "5 Best Tools for Devs",
    "AI Trends in 2025",
    "Boost Productivity in 1 Week",
  ];

  const trending = [
    { title: "React vs. Svelte: 2025 Edition" },
    { title: "Mastering Prompt Engineering" },
    { title: "10x Your Career with AI" },
  ];

  return (
    <aside className="w-full md:w-80 px-5.5 py-5 space-y-6 text-sm sticky top-0 min-h-screen bg-[#ebebeb]">
      {/* Recommended Posts */}
      <div className="space-y-6">
        <h2 className="text-[#001A6E] font-semibold text-base">Recommended for You</h2>
        <ul className="space-y-2">
          {recommendations.map((post, idx) => (
            <li
              key={idx}
              className="text-[#074799] hover:underline hover:text-[#009990] cursor-pointer transition-colors"
            >
              • {post}
            </li>
          ))}
        </ul>
      </div>

      {/* Trending Posts */}
      <div className="space-y-6">
        <h2 className="text-[#001A6E] font-semibold text-base">Trending Posts</h2>
        <ul className="space-y-3">
          {trending.map((post, idx) => (
            <li key={idx} className="flex items-start justify-between">
              <span className="text-[#074799] hover:underline hover:text-[#009990] cursor-pointer transition-colors">
                {post.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
