"use client";

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to Virtual Keyboard
        </h1>
        <p className="text-xl font-light mb-8">Sample text here.</p>
        <div className="flex space-x-6">
          <Link to="/play">
            <button className="px-8 py-4 bg-blue-600 text-lg font-medium rounded-full hover:bg-blue-700 transition duration-300">
              🎵 Get Started
            </button>
          </Link>
          <Link to="/create">
            <button className="px-8 py-4 bg-gray-700 text-lg font-medium rounded-full hover:bg-gray-600 transition duration-300">
              ✏️ Create Music
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-2">🎶 Play Music</h3>
            <p className="text-sm text-gray-300">
              Play notes seamlessly with our virtual piano.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">✏️ Create Tunes</h3>
            <p className="text-sm text-gray-300">
              Create and save your compositions with ease.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">🚀 Easy to Use</h3>
            <p className="text-sm text-gray-300">
              Designed for musicians of all levels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
