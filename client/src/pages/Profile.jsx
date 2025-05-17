import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import userPlaceholder from '../assets/user.png';
import {ProfileCard} from '../components/Profile';
import {PostList} from '../components/Posts';

const Profile = () => {
  const { user, isAuthenticated, updateUserProfilePic } = useAuth();
  const [profileImage, setProfileImage] = useState(userPlaceholder);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      if (user.profilePic) setProfileImage(user.profilePic);
      if (user.posts) setPosts(user.posts);
    }
  }, [user]);

  const handleImageChange = async (e) => {
    const token = localStorage.getItem('token');
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      const formData = new FormData();
      formData.append('profilePic', file);

      try {
        const response = await axios.post(
          `http://localhost:3000/api/users/upload-profile-pic`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.data.profilePic) {
          setProfileImage(response.data.profilePic);
          setMessage('Profile picture uploaded successfully!');
          updateUserProfilePic(response.data.profilePic);
        }
      } catch (error) {
        console.error('Failed to upload image', error);
        setMessage('Failed to upload profile picture. Please try again.');
      }
    } else {
      alert('Please select a valid image file.');
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="p-4 text-center text-red-600 font-semibold">
        You need to log in to view this page.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <ProfileCard
        profileImage={profileImage}
        name={user.name}
        email={user.email}
        message={message}
        onImageChange={handleImageChange}
      />
      <PostList posts={posts} />
    </div>
  );
};

export default Profile;
