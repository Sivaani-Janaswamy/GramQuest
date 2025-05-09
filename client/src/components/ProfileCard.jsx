import React, { useRef } from 'react';
import Card from './Card';

const ProfileCard = ({ profileImage, name, email, message, onImageChange }) => {
  const fileInputRef = useRef(null);

  return (
    <Card>
      <div className="flex items-center space-x-6">
        <label htmlFor="profilePic" className="cursor-pointer relative group">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 group-hover:opacity-75 transition"
          />
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            onChange={onImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </label>

        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-gray-500">{email}</p>
        </div>
      </div>

      {message && (
        <div
          className={`mt-4 text-center ${
            message.includes('successfully') ? 'text-green-600' : 'text-red-600'
          } font-semibold`}
        >
          {message}
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;
