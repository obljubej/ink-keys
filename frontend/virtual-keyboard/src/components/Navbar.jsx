"use client";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-gradient-to-br from-gray-800 via-purple-50 to-purple-100 text-white shadow-lg">
      {/* Title */}
        <Link
            to="/"
            className=""
          >
            <h1 className="text-3xl font-bold hover:brightness-[150%]">Virtual Keyboard</h1>
          </Link>
      

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="px-4 py-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/play"
          className="px-4 py-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition duration-300"
        >
          Play
        </Link>
        <Link
          to="/create"
          className="px-4 py-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition duration-300"
        >
          Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
