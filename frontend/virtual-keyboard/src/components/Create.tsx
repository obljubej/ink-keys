import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import Navbar from "./Navbar";
import { animateKey, play } from "./tone.fn.js";
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
  const eventSourceRef = useRef<EventSource | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Cleanup the stream when the component unmounts
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    // Handle note changes and learning mode
    if (notes && isLearning && tuneIndex !== null) {
      handleNotePlayed(notes);
      playNotes(notes);
    }
  }, [notes, isLearning, tuneIndex]);

  const startStream = () => {
    if (eventSourceRef.current) return; // Prevent multiple streams

    const eventSource = new EventSource("http://localhost:8080/stream-notes");
    eventSource.onmessage = (event) => {
      const newNotes = event.data;
      console.log("Streamed Notes:", newNotes);

      setNotes(newNotes); // Update notes, which triggers the useEffect above
    };

    eventSource.onerror = (error) => {
      console.error("Error with the EventSource:", error);
      eventSource.close();
    };

    eventSourceRef.current = eventSource;
  };

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
  

  const playNotes = (notes: string) => {
    if (!notes) return;

    const noteArray = notes.split(",");
    const synth = new Tone.PolySynth().toDestination();

    noteArray.forEach((note) => {
      synth.triggerAttackRelease(note, "8n");
      animateKey(note);
    });
  };

  const startLearning = (index: number) => {
    setTuneIndex(index);
    setCurrentNoteIndex(0);
    setIsLearning(true);
  };

  const handleNotePlayed = (note: string) => {
    console.log("isLearning:", isLearning, "tuneIndex:", tuneIndex, "note:", note);

    if (tuneIndex !== null && isLearning) {
      const tuneNotes = tunesArray[tuneIndex].notes.split(",");
      const correctNote = tuneNotes[currentNoteIndex];

      if (note === correctNote) {
        setNoteColor("text-white");
        animateKey(note);
        setCurrentNoteIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          if (nextIndex === tuneNotes.length) {
            setIsLearning(false);
            alert("🎉 Congratulations! You completed the tune!");
          }

          if (tuneNotes[nextIndex] !== " ; ") {
            animateKey(tuneNotes[nextIndex]);
          }

          return tuneNotes[nextIndex] === " ; " ? nextIndex + 1 : nextIndex;
        });
      } else {
        setNoteColor("text-red-500");
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
                onClick={() => {
                  startLearning(index);
                  startStream();
                }}
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
        {/* White and black keys */}
        {[
          { note: "C4", playFn: playC4 },
          { note: "Db4", playFn: playDb4 },
          { note: "D4", playFn: playD4 },
          { note: "Eb4", playFn: playEb4 },
          { note: "E4", playFn: playE4 },
          { note: "F4", playFn: playF4 },
          { note: "Gb4", playFn: playGb4 },
          { note: "G4", playFn: playG4 },
          { note: "Ab4", playFn: playAb4 },
          { note: "A4", playFn: playA4 },
          { note: "Bb4", playFn: playBb4 },
          { note: "B4", playFn: playB4 },
          { note: "C5", playFn: playC5 },
        ].map(({ note, playFn }, index) => (
          <div
            key={index}
            className={note.includes("b") ? "black-key" : "white-key"}
            data-note={note}
            onClick={() => {
              playFn();
              handleNotePlayed(note);
            }}
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Create;
