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
    console.log("Initial Past Notes in useEffect:", pastNotes); // Log at mount

    fetchNotes();
    const interval = setInterval(fetchNotes, 300); // Regularly fetch notes
    return () => clearInterval(interval);
  }, []);

  const fetchNotes = () => {
    axios
      .get("http://localhost:8080/get-notes")
      .then((response) => {
        console.log("Fetched Notes:", response.data);
        console.log("Past Notes Before Update:", pastNotes);

        if (!response.data || response.data === pastNotes) {
          if (!response.data && pastNotes !== response.data) {
            pastNotes = response.data;
          }
          return;
        }

        setNotes(response.data); // For development/testing ease

        if (response.data !== pastNotes) {
          pastNotes = response.data;
          playNotes(response.data); // Play notes when received
        }

        console.log("Past Notes After Update:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  const playNotes = (notes: string) => {
    if (!notes) {
      return;
    }

    const noteArray = notes.split(","); // Split the string into an array of notes
    const synth = new Tone.PolySynth().toDestination();

    // Trigger all notes at once
    synth.triggerAttackRelease(noteArray, "8n");

    // Animate keys for all notes
    noteArray.forEach((note) => animateKey(note));
  };

  const startAudio = async () => {
    await Tone.start(); // Start the Tone.js audio context
    setAudioStarted(true);
    console.log("Audio started!");
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
