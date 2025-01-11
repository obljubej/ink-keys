"use client";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-gradient-to-br from-blue-800 via-gray-900 to-black text-white shadow-lg">
      {/* Title */}
      <h1 className="text-3xl font-bold">Virtual Keyboard</h1>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/play"
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Play
        </Link>
        <Link
          to="/create"
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
