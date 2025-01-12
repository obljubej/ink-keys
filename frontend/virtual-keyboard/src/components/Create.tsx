import React, { useState, useRef, useEffect } from "react";
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

const CustomTune = () => {
    const [customTune, setCustomTune] = useState("");
    const [savedTunes, setSavedTunes] = useState<string[]>([]);
    const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);
    const [isLearning, setIsLearning] = useState(false);
    const [noteColor, setNoteColor] = useState<string>("text-white");
    const eventSourceRef = useRef<EventSource | null>(null);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const storedTunes = localStorage.getItem("savedTunes");
        if (storedTunes) {
            setSavedTunes(JSON.parse(storedTunes));
        }

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);

    useEffect(() => {
        if (notes && isLearning) {
            handleNotePlayed(notes);
            playNotes(notes);
        }
    }, [notes, isLearning]);

    const startStream = () => {
        if (eventSourceRef.current) return;

        const eventSource = new EventSource("http://localhost:8080/stream-notes");
        eventSource.onmessage = (event) => {
            setNotes(event.data);
        };

        eventSourceRef.current = eventSource;
    };

    const playTune = (tuneNotes: string) => {
        const noteArray = tuneNotes.split(",");
        noteArray.forEach((note, index) => {
            setTimeout(() => {
                const synth = new Tone.PolySynth().toDestination();
                if (note !== " ; ") {
                    synth.triggerAttackRelease(note, "8n");
                    animateKey(note);
                }
            }, index * 500);
        });
    };

    const playNotes = (notes: string) => {
        const noteArray = notes.split(",");
        const synth = new Tone.PolySynth().toDestination();

        noteArray.forEach((note) => {
            synth.triggerAttackRelease(note, "8n");
            animateKey(note);
        });
    };

    const saveTune = () => {
        const updatedTunes = [...savedTunes, customTune];
        setSavedTunes(updatedTunes);
        localStorage.setItem("savedTunes", JSON.stringify(updatedTunes));
        alert("Tune saved successfully!");
    };

    const startLearning = () => {
        setCurrentNoteIndex(0);
        setIsLearning(true);
        startStream();
    };

    const handleNotePlayed = (note: string) => {
        if (isLearning) {
            const tuneNotes = customTune.split(",");
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
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex p-4 gap-4">
                {/* Left Section: Enter Custom Tune */}
                <div className="w-1/3 border-r border-gray-300 pr-4">
                    <div className="card p-4 border border-gray-300 rounded-lg shadow-md bg-purple-50 text-white">
                        <h3 className="text-xl font-semibold mb-2 text-center">Enter Your Custom Tune</h3>
                        <textarea
                            className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4 text-black"
                            placeholder="Enter notes in the format: C4,D4,E4,F4..."
                            value={customTune}
                            onChange={(e) => setCustomTune(e.target.value)}
                        />
                        <div className="flex justify-center space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors duration-300"
                                onClick={() => playTune(customTune)}
                            >
                                Preview
                            </button>
                            <button
                                className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors duration-300"
                                onClick={startLearning}
                            >
                                Learn
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
                                onClick={saveTune}
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    {savedTunes.length > 0 && (
                        <div className="mt-0">
                            <h4 className="text-lg font-semibold mb-2 text-center text-white">Your Saved Tunes</h4>
                            {savedTunes.map((tune, index) => (
                                <div
                                    key={index}
                                    className="card p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-purple-50 text-white mb-4"
                                >
                                    <h3 className="text-xl font-semibold mb-2 text-center">Custom Tune {index + 1}</h3>
                                    <p className="text-lg text-center font-bold tracking-widest">{tune}</p>
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors duration-300"
                                            onClick={() => playTune(tune)}
                                        >
                                            Preview
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors duration-300"
                                            onClick={() => {
                                                setCustomTune(tune);
                                                startLearning();
                                            }}
                                        >
                                            Learn
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
                                            onClick={() => {
                                                const updatedTunes = savedTunes.filter((_, i) => i !== index);
                                                setSavedTunes(updatedTunes);
                                                localStorage.setItem("savedTunes", JSON.stringify(updatedTunes));
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                {/* Right Section: Details & Piano */}
                <div className="w-2/3">
                    {isLearning && (
                        <div className="mb-8">
                            <div className="card p-10 border border-gray-300 rounded-lg shadow-md bg-purple-50 text-white">
                                <h2 className="text-2xl font-bold mb-4 text-center">Learning Mode</h2>
                                <p className="text-lg text-center font-bold tracking-widest">
                                    {customTune}
                                </p>
                                <div className="mt-4 text-center">
                                    <p className="text-lg font-semibold">
                                        Play: <span className={noteColor}>{customTune.split(",")[currentNoteIndex]}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="piano grid grid-cols-7 font-geistMono">
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
            </div>
        </div>
    );
};

export default CustomTune;
