"use client";

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-grey via-purple-100 to-purple-100 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to Virtual Keyboard
        </h1>
        <p className="text-xl font-light mb-8">          Experience the future of music creation with our computer-vision-powered virtual piano. Transform your gestures into melodies!
        </p>
        <div className="flex space-x-6">
          <Link to="/play">
            <button className="px-8 py-4 bg-pale-100 text-lg font-medium rounded-full hover:bg-pale-150 transition duration-300">
              🎵 Get Started
            </button>
          </Link>
          <Link to="/create">
            <button className="px-8 py-4 bg-purple-50 text-lg font-medium rounded-full hover:bg-purple-150 transition duration-300">
              ✏️ Learn Music
            </button>
          </Link>
        </div>
      </section>

            {/* Features Section */}
      <section className="py-16 px-8 bg-purple-150 text-gray-200">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">🎶 Play Music</h3>
            <p className="text-sm">
            Play your favorite tunes with ease using our virtual piano,
            powered by cutting-edge computer vision technology.
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">✏️ Create and Learn Tunes</h3>
            <p className="text-sm">
              Learn how to play songs through our interactive tutorials!
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">🚀 Powered by Computer Vision</h3>
            <p className="text-sm">
            Our computer vision technology captures your gestures and translates
            them into beautiful melodies with precision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
