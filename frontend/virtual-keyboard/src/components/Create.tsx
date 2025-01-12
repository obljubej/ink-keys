import React, { useState } from "react";
import * as Tone from "tone";
import Navbar from "./Navbar";
import { animateKey } from "./tone.fn.js";
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
} from "./tone.fn.js";

const Create = () => {
  const [tuneIndex, setTuneIndex] = useState<number | null>(null);
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);
  const [isLearning, setIsLearning] = useState(false);
  const [noteColor, setNoteColor] = useState<string>("text-white");


  const tunesArray = [
    {
      name: "Twinkle Twinkle Little Star",
      notes: "C4,C4,G4,G4,A4,A4,G4, ; ,F4,F4,E4,E4,D4,D4,C4",
    },
    {
      name: "Mary Had a Little Lamb",
      notes: "E4,D4,C4,D4,E4,E4,E4, ; ,D4,D4,D4, ; ,E4,G4,G4",
    },
    {
      name: "Hot Cross Buns",
      notes: "E4,D4,C4, ; ,E4,D4,C4, ; ,C4,C4,C4,C4,D4,D4,D4,D4,E4,D4,C4",
    },
  ];

  // Play tune preview
  const playTune = (tuneNotes: string) => {
    const noteArray = tuneNotes.split(",");
    noteArray.forEach((note, index) => {
      setTimeout(() => {
        const synth = new Tone.PolySynth().toDestination();
        if (note !== " ; ") {
          synth.triggerAttackRelease(note, "8n");
          animateKey(note); // Highlight key during preview
        }
      }, index * 500); // Adjust the delay as needed
    });
  };

  // Start learning mode
  const startLearning = (index: number) => {
    setTuneIndex(index);
    setCurrentNoteIndex(0);
    setIsLearning(true);
  };

  // Handle note played by the user
  const handleNotePlayed = (note: string) => {
    if (tuneIndex !== null && isLearning) {
      const tuneNotes = tunesArray[tuneIndex].notes.split(",");
      const correctNote = tuneNotes[currentNoteIndex];

      if (note === correctNote) {
        setNoteColor("text-white"); // Set note color to white for correct note
        animateKey(note); // Animate correct key
        setCurrentNoteIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          if (nextIndex === tuneNotes.length) {
            setIsLearning(false);
            alert("🎉 Congratulations! You completed the tune!");
          }

          if (tuneNotes[nextIndex] !== " ; ") {
            animateKey(tuneNotes[nextIndex]); // Animate the next correct key
          }

          // Skip semicolons
          if (tuneNotes[nextIndex] === " ; ") {
            return nextIndex + 1;
          }

          return nextIndex;
        });
      } else {
        setNoteColor("text-red-500"); // Change note color to red for incorrect note
        // alert("🚫 Incorrect note. Try again!");
      }
    }
  };


  return (
    <div>
      <Navbar />
      <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {tunesArray.map((tune, index) => (
          <div
            key={index}
            className="card p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-purple-50 text-white"
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
                className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors duration-300"
                onClick={() => startLearning(index)}
              >
                Learn
              </button>
            </div>
          </div>
        ))}
      </div>

      {tuneIndex !== null && (
        <div className="mt-8 flex justify-center">
          <div className="card p-10 border border-gray-300 rounded-lg shadow-md bg-purple-50 text-white w-[50%] min-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {tunesArray[tuneIndex].name} Notes
            </h2>
            <p className="text-lg text-center font-bold tracking-widest">
              {tunesArray[tuneIndex].notes}
            </p>
            {isLearning && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">
                  Play: <span className={noteColor}>{tunesArray[tuneIndex].notes.split(",")[currentNoteIndex]}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}


      {/* Piano */}
      <div className="piano">
        <div
          className="white-key"
          onClick={() => {
            playC4();
            handleNotePlayed("C4");
          }}
        >
          C
        </div>
        <div
          className="black-key"
          onClick={() => {
            playDb4();
            handleNotePlayed("Db4");
          }}
        >
          Db
        </div>
        <div
          className="white-key"
          onClick={() => {
            playD4();
            handleNotePlayed("D4");
          }}
        >
          D
        </div>
        <div
          className="black-key"
          onClick={() => {
            playEb4();
            handleNotePlayed("Eb4");
          }}
        >
          Eb
        </div>
        <div
          className="white-key"
          onClick={() => {
            playE4();
            handleNotePlayed("E4");
          }}
        >
          E
        </div>
        <div
          className="white-key"
          onClick={() => {
            playF4();
            handleNotePlayed("F4");
          }}
        >
          F
        </div>
        <div
          className="black-key"
          onClick={() => {
            playGb4();
            handleNotePlayed("Gb4");
          }}
        >
          Gb
        </div>
        <div
          className="white-key"
          onClick={() => {
            playG4();
            handleNotePlayed("G4");
          }}
        >
          G
        </div>
        <div
          className="black-key"
          onClick={() => {
            playAb4();
            handleNotePlayed("Ab4");
          }}
        >
          Ab
        </div>
        <div
          className="white-key"
          onClick={() => {
            playA4();
            handleNotePlayed("A4");
          }}
        >
          A
        </div>
        <div
          className="black-key"
          onClick={() => {
            playBb4();
            handleNotePlayed("Bb4");
          }}
        >
          Bb
        </div>
        <div
          className="white-key"
          onClick={() => {
            playB4();
            handleNotePlayed("B4");
          }}
        >
          B
        </div>
        <div
          className="white-key"
          onClick={() => {
            playC5();
            handleNotePlayed("C5");
          }}
        >
          C
        </div>
      </div>

    </div>
  );
};

export default Create;
