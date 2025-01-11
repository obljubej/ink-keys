"use client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Play from "./components/Play";
import Create from "./components/Create";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define individual routes */}
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<div className="flex flex-col h-screen justify-center items-center bg-gray-900">
    <h1 className="text-6xl font-bold text-pale-50 mb-4">404</h1>
    <h2 className="text-2xl text-grey mb-8">Page Not Found</h2>
    <a href="/" className="text-grey hover:underline">Go back to Home</a>
  </div>} />
      </Routes>
    </Router>
  );
}

export default App;
