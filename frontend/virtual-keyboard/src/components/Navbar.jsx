"use client";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-col items-center w-full p-4 bg-gray-800 text-white shadow-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Virtual Keyboard</h1>

      {/* Left Side */}
      <div className="flex items-center gap-6 mb-4">
        <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
          Home
        </button>
        <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
          Play
        </button>
        <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
          Create
        </button>
      </div>

      {/* Right Side (Optional: Add icons, user info, etc.) */}
      <div className="flex items-center gap-4">
        {/* User avatar, notifications, or any other elements */}
        <div className="flex items-center gap-3 cursor-pointer">
          {/* Add icons or notifications */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
