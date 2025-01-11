"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Tone from "tone";
import Navbar from "./Navbar";
import Piano from "./Piano";

const App = () => {
  // const [notes, setNotes] = useState("");
  // useEffect(() => {
  //   fetchNotes();
  //   const interval = setInterval(fetchNotes, 1);
  //   return () => clearInterval(interval);
  // }, []);

  // const fetchNotes = () => {
  //   axios
  //     .get("http://localhost:8080/get-notes")
  //     .then((response) => {
  //       setNotes(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching notes:", error);
  //     });
  // };

  // const playNotes = () => {
  //   if (!notes) {
  //     alert("No notes to play. Please fetch notes first.");
  //     return;
  //   }
  //   const noteArray = notes.split(",");
  //   const synth = new Tone.PolySynth().toDestination();

  //   synth.triggerAttackRelease(noteArray, "100n");
  // };

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  return (
    <div>
      <Navbar />
      <Piano />
      <h1>Play Notes from Backend</h1>
      {/* <button onClick={fetchNotes}>Fetch Notes</button>
      <button onClick={playNotes}>Play Notes</button>
      <p>Notes: {notes}</p> */}
    </div>
  );
};

export default App;
