// pages/Quest.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuestCard from '../components/QuestCard';
import SearchBar from '../components/SearchBar';

const Quest = () => {
  const [quests, setQuests] = useState([
    {
      title: "Coding Marathon",
      description: "Code daily for 30 minutes. Track your progress and stay consistent!",
    },
    {
      title: "Fitness Sprint",
      description: "Complete a 10k steps challenge for the next 15 days.",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleJoin = (title) => {
    // Functionality to be added later
    console.log(`Joined: ${title}`);
  };

  const filteredQuests = quests.filter((quest) =>
    quest.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Quests</h1>
        <p className="text-lg text-gray-600">Join exciting quests and track your progress!</p>
      </div>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Custom Styled Button as Link */}
      <div className="text-center my-6">
        <Link
          to="/create-quest"
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold text-gray-900 rounded-xl group bg-gradient-to-br from-teal-300 to-lime-300 
          group-hover:from-teal-400 group-hover:to-lime-400 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
        >
          <span className="relative px-6 py-2.5 transition-all ease-in duration-100 bg-white dark:bg-gray-900 rounded-xl group-hover:bg-transparent group-hover:dark:bg-transparent whitespace-nowrap">
            Create New Quest
          </span>
        </Link>
      </div>

      {/* Quest Cards */}
      {filteredQuests.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center items-start">
          {filteredQuests.map((quest, index) => (
            <QuestCard
              key={index}
              title={quest.title}
              description={quest.description}
              onJoin={() => handleJoin(quest.title)}
            />
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-600 text-center">No quests available. Create a new quest!</p>
      )}
    </div>
  );
};

export default Quest;
