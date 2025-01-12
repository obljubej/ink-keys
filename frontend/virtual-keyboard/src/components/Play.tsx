"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Tone from "tone";
import Navbar from "./Navbar";
import Piano from "./Piano";
import {
  playC4,
  playDb4,
  playD4,
  playEb4,
  playE4,
  playF4,
  playGb4,
  playG4,
  playAb4,
  playA4,
  playBb4,
  playB4,
  playC5,
  play,
  animateKey,
} from "./tone.fn.js";

const App = () => {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchNotes();
    // ! change this to fetchnotes waiting for the noise to finsish inside of each play___ function
    const interval = setInterval(fetchNotes, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotes = () => {
    axios
      .get("http://localhost:8080/get-notes")
      .then((response) => {
        setNotes(response.data); //TODOremove when done testing, for dev ease
        playNotes(response.data); // Play notes when they are received
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  const playNotes = (notes: string) => {
    if (!notes) {
      alert("No notes to play. Please fetch notes first.");
      return;
    }
    const noteArray = notes.split(",");

    noteArray.forEach((noteNew) => {
      setTimeout(() => {
        const synth = new Tone.PolySynth().toDestination();
        synth.triggerAttackRelease(noteNew, "8n");
        animateKey(noteNew);
      }, 3000);
    });
  };

  return (
    <div>
      <Navbar />
      <Piano />
      <div className="flex flex-col items-center">
        <p className="text-lg text-gray-700 mt-4">Notes: {notes}</p>
      </div>
    </div>
  );
};

export default App;
