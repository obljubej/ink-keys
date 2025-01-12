"use client";

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-grey via-purple-100 to-purple-100 text-white">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg font-geist">
            Welcome to Ink-Keys
          </h1>
          <p className="text-xl font-light mb-8">          Experience the future of music creation with our computer-vision-powered virtual piano. <br/>Transform your ink and pen into melodies, anywhere, anytime!
          </p>
        </section>

              {/* Features Section */}
        <section className="py-16 px-8 bg-slate-600 text-gray-200 min-h-screen flex align-middle justify-center flex-col shadow-xl">
          <h2 className="text-4xl font-bold text-center mb-12 font-geist">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-purple-150 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 min-h-[20rem] flex align-middle justify-center flex-col">
              <h3 className="text-3xl font-semibold mb-4 text-center text-gray-100">🎶 Play Music, Freestyle</h3>
              <p className="text-sm py-5 text-center text-gray-100">
              Play your favorite tunes with ease using our virtual piano,
              powered by cutting-edge computer vision technology.
              </p>
              <div className="flex align-middle justify-center">
          <Link to="/play">
            <button className="px-8 py-3 bg-purple-50 text-md font-medium rounded-full hover:brightness-75 transition duration-300 text-gray-100">
              🎵 Get Started
            </button>
          </Link>
              </div>
            </div>
            <div className="bg-purple-150 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 min-h-[20rem] flex align-middle justify-center flex-col">
              <h3 className="text-3xl font-semibold mb-4 text-center text-grey-100">✏️ Learn to Play Tunes</h3>
              <p className="text-sm py-5 text-center text-grey-100">
              Learn how to play songs through our interactive tutorials, or create and save your own custom tunes!
              </p>
              <div className="flex align-middle justify-center">
          <Link to="/learn">
            <button className="px-8 py-3 bg-purple-50 text-md font-medium rounded-full hover:brightness-75 transition duration-300 text-gray-100">
            📖 Learn Music
            </button>
          </Link>
              </div>
            </div>
            <div className="bg-purple-150 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 min-h-[20rem] flex align-middle justify-center flex-col">
              <h3 className="text-3xl font-semibold mb-4 text-center text-grey-100">🚀 Powered by Computer Vision</h3>
              <p className="text-sm py-5 text-center text-grey-100">
              Our computer vision technology captures your gestures and translates
              them into beautiful melodies with precision.
              </p>
              <div className="flex align-middle justify-center">
          <Link to="/create">
            <button className="px-8 py-3 bg-purple-50 text-md font-medium rounded-full hover:brightness-75 transition duration-300 text-gray-100">
            💡 Create Music
            </button>
          </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
