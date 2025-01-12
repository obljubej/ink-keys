"use client";
import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import Navbar from "./Navbar";
import Piano from "./Piano";
import { animateKey } from "./tone.fn.js";

const Play = () => {
  const [notes, setNotes] = useState("");
  const [audioStarted, setAudioStarted] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Cleanup the stream when the component unmounts
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const startAudio = async () => {
    await Tone.start(); // Start the Tone.js audio context
    setAudioStarted(true);
    console.log("Audio started!");
    startStream(); // Start the stream once the audio is initialized
  };

  const startStream = () => {
    if (eventSourceRef.current) return; // Prevent multiple streams

    const eventSource = new EventSource("http://localhost:8080/stream-notes");
    eventSource.onmessage = (event) => {
      const newNotes = event.data;
      console.log("Streamed Notes:", newNotes);

      if (newNotes && newNotes !== notes) {
        setNotes(newNotes);
        playNotes(newNotes);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Error with the EventSource:", error);
      eventSource.close();
    };

    eventSourceRef.current = eventSource;
  };

  const playNotes = (notes: string) => {
    if (!notes) return;

    const noteArray = notes.split(","); // Split the string into an array of notes
    const synth = new Tone.PolySynth().toDestination();

    // Trigger all notes at once
    synth.triggerAttackRelease(noteArray, "8n");

    // Animate keys for all notes
    noteArray.forEach((note) => animateKey(note));
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
