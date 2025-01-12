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
        console.log("Past Notes Before Update:", pastNotes);
        if (!response.data || response.data === pastNotes) {
          if (!response.data && pastNotes != response.data) {
            pastNotes = response.data;
          }
          return;
        }

        setNotes(response.data); //TODOremove when done testing, for dev ease

        if (response.data != pastNotes) {
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
            className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
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
