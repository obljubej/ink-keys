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

const Home = () => {
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
        checkNotes(response.data); // Play notes when they are received
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  const checkNotes = (notes: string) => {
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

  const tunesArray = [
    {
      name: "Twinkle Twinkle Little Star",
      notes: "C4,C4,G4,G4,A4,A4,G4,,F4,F4,E4,E4,D4,D4,C4",
      selected: false,
    },
    {
      name: "Mary Had a Little Lamb",
      notes: "E4,D4,C4,D4,E4,E4,E4,,D4,D4,D4,,E4,G4,G4",
      selected: false,
    },
    {
      name: "Hot Cross Buns",
      notes: "E4,D4,C4,,E4,D4,C4,,C4,C4,C4,C4,D4,D4,D4,D4,E4,D4,C4",
      selected: false,
    },
  ];

  const playTune = (tuneNotes: string) => {
    const noteArray = tuneNotes.split(",");
    noteArray.forEach((note, index) => {
      setTimeout(() => {
        const synth = new Tone.PolySynth().toDestination();
        if (note === '') {
          
        } else{
        synth.triggerAttackRelease(note, "8n");
        animateKey(note);
        }
      }, index * 500); // Adjust the delay as needed
    });
  };


  return <div className="">
    <Navbar />
    <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {tunesArray.map((tune, index) => (
      <div
      key={index}
      className={`card p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-purple-50 text-white`}
      >
      <h3 className="text-xl font-semibold mb-2 text-center">{tune.name}</h3>
      <div className="flex justify-center space-x-4">
      <button
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors duration-300"
        onClick={() => playTune(tune.notes)}
      >
        Preview
      </button>
      <button
        className="px-4 py-2 bg-pale-150 text-white rounded hover:bg-pale-200 transition-colors duration-300"
        // onClick={() => learnTune(index)}
      >
        Learn
      </button>
      </div>
      </div>
      ))}
    </div>
    <Piano />
    <div className="flex flex-col items-center">
        <p className="text-lg text-gray-700 mt-4">Notes: {notes}</p>
      </div>
    </div>;
};
// want to give the user presets of some tunes that they can choose to play, and what we're basically doing is playing the notes of the tune that they choose and making sure that the right key is clicked before they keep going to the next note. 
export default Home;
