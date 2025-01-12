"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Tone from "tone";
import Navbar from "./Navbar";
import Piano from "./Piano";
import { animateKey } from "./tone.fn.js";

const App = () => {
  const [notes, setNotes] = useState("");
  let pastNotes = "";
  useEffect(() => {
    console.log("Initial Past Notes in useEffect:", pastNotes); // Log at mount

    fetchNotes();
    // ! change this to fetchnotes waiting for the noise to finsish inside of each play___ function
    const interval = setInterval(fetchNotes, 300);
    return () => clearInterval(interval);
  }, []);

  const fetchNotes = () => {
    axios
      .get("http://localhost:8080/get-notes")
      .then((response) => {
        console.log("Fetched Notes:", response.data);
        console.log("Past Notes Before Update:", pastNotes);
        if (!response.data || response.data === pastNotes) {
          return;
        }

        setNotes(response.data); //TODOremove when done testing, for dev ease

        if (response.data != pastNotes) {
          pastNotes = response.data;
        }

        console.log("Past Notes After Update:", response.data);

        playNotes(response.data); // Play notes when they are received
      })
      .catch((error) => {});
  };

  const playNotes = (notes: string) => {
    if (!notes) {
      return;
    }
    const noteArray = notes.split(",");

    noteArray.forEach((noteNew) => {
      setTimeout(() => {
        const synth = new Tone.PolySynth().toDestination();
        synth.triggerAttackRelease(noteNew, "8n");
        animateKey(noteNew);
      }, 500);
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
