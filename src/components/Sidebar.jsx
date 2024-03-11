import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import UserProfile from './UserProfile';

function Sidebar() {
  // Dummy logout function
  const handleLogout = () => {
    // Your logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="w-1/5 h-screen bg-zinc-800 fixed left-0 top-0 flex flex-col items-center">
      <div className='mt-20 ml-3'>
        <UserProfile description="francesco.setiawan@binus.ac.id" name="Francesco Emmanuel" profileIcon="src\assets\pas-photo.png" />
      </div>
    <div className=' mt-auto mb-5'>
        <button
            className="rounded mt-auto mb-auto px-4 py-2 text-white flex items-center justify-center bg-red-400 border border-red-400  cursor-pointer outline-none 
            transition duration-300 ease-in-out hover:bg-opacity-20 hover:text-red-400 focus-visible:bg-opacity-20"
            onClick={handleLogout}
        >
            <FaSignOutAlt className="mr-2" />
            Logout
        </button>
    </div>
      
    </div>
  );
}

export default Sidebar;
