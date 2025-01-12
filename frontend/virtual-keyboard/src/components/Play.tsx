"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Tone from "tone";
import Navbar from "./Navbar";
import Piano from "./Piano";
import { animateKey } from "./tone.fn.js";

const Play = () => {
  const [notes, setNotes] = useState("");
  const [audioStarted, setAudioStarted] = useState(false);
  let pastNotes = "";

  useEffect(() => {
    if (audioStarted) {
      const interval = setInterval(fetchNotes, 300);
      return () => clearInterval(interval);
    }
  }, [audioStarted]);

  const startAudio = async () => {
    await Tone.start();
    console.log("Tone.js Audio Context started");
    setAudioStarted(true); // Enable fetching and playing notes
  };

  const fetchNotes = () => {
    axios
      .get("http://localhost:8080/get-notes")
      .then((response) => {
        console.log("Fetched Notes:", response.data);
        setNotes(response.data); // For display
        if (response.data && response.data !== pastNotes) {
          pastNotes = response.data;
          playNotes(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  const playNotes = (notes: string) => {
    if (!notes) return;

    const noteArray = notes.split(",");
    const synth = new Tone.PolySynth().toDestination();

    noteArray.forEach((noteNew) => {
      synth.triggerAttackRelease(noteNew, "8n");
      animateKey(noteNew);
    });
  };

  return (
    <div>
      <Navbar />
      <Piano />
      <div className="flex flex-col items-center">
        {!audioStarted ? (
          <button
            onClick={startAudio}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-10 transition-colors duration-300"
          >
            Start Audio
          </button>
        ) : (
          <p className="text-lg text-gray-700 mt-4">Notes: {notes}</p>
        )}
      </div>
    </div>
  );
};

export default Play;
