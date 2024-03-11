import React, { useState } from 'react';
import { FaCheck, FaClock, FaTimes, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserProfile = ({ description, name, profileIcon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(description);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    // Implement logic to update user profile data
    console.log('Updated Data:', { editedName, editedEmail });
    closeModal();
  };

  return (
    <div className="container mx-auto p-4 rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24 mb-2">
          <img
            src={profileIcon}
            alt="Profile Icon"
            className="object-cover w-full h-full rounded-full"
          />
          <div
            className="absolute right-0 bottom-0 cursor-pointer text-white"
            onClick={openModal}
          >
            <FaEdit />
          </div>
        </div>
        <div className="text-center">
          <span className="text-white text-xl block">{editedName}</span>
          <span className="text-gray-300 text-xs block opacity-75">{editedEmail}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="info-container bg-green-400 opacity-75">
          <span className="text-white text-3xl">1</span>
          <span className="text-white text-xs">Completed</span>
          {/* <FaCheck className="text-green-500 text-lg" /> */}
        </div>
        <div className="info-container bg-orange-400 opacity-75">
          <span className="text-white text-3xl">2</span>
          <span className="text-white text-xs">To complete</span>
          {/* <FaClock className="text-yellow-500 text-lg" /> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="info-container bg-red-400 opacity-75">
          <span className="text-white text-3xl">1</span>
          <span className="text-white text-xs">Missed</span>
          {/* <FaTimes className="text-red-500 text-lg" /> */}
        </div>
        <div className="info-container bg-blue-400 opacity-75">
          <span className="text-white text-3xl ">50%</span>
          <span className="text-white text-xs ">Completion rate</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
