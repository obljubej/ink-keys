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
        <Route path="*" element={<h1 className="text-center mt-20">Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
