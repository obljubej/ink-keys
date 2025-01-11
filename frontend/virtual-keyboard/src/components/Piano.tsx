import React from "react";
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
} from "./tone.fn.js";

const Piano = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-center text-4xl font-bold my-8">Piano</h1>
      <div className="relative flex justify-center w-full max-w-5xl">
        <div className="relative z-10 flex">
          <div className="white-key" onClick={playC4}>
            C
          </div>
          <div className="white-key" onClick={playD4}>
            D
          </div>
          <div className="white-key" onClick={playE4}>
            E
          </div>
          <div className="white-key" onClick={playF4}>
            F
          </div>
          <div className="white-key" onClick={playG4}>
            G
          </div>
          <div className="white-key" onClick={playA4}>
            A
          </div>
          <div className="white-key" onClick={playB4}>
            B
          </div>
          <div className="white-key" onClick={playC5}>
            C
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 flex justify-center z-20">
          <div
            className="bg-black w-10 h-32 ml-5 -mr-5 z-10 text-red-500 border-red-500 border-2 text-center flex items-end justify-center"
            onClick={playDb4}
          >
            Db
          </div>
          <div
            className="bg-black w-10 h-32 ml-5 -mr-5 z-10 text-red-500 border-red-500 border-2 text-center flex items-end justify-center"
            onClick={playEb4}
          >
            Eb
          </div>
          <div className="bg-black w-10 h-32 ml-5 -mr-5 z-10 text-red-500 border-red-500 border-2 text-center flex items-end justify-center "></div>
          <div
            className="bg-black w-10 h-32 ml-5 -mr-5 z-10 text-red-500 border-red-500 border-2 text-center flex items-end justify-center"
            onClick={playGb4}
          >
            Gb
          </div>
          <div
            className="bg-black w-10 h-32 ml-5 -mr-5 z-10 text-red-500 border-red-500 border-2 text-center flex items-end justify-center"
            onClick={playAb4}
          >
            Ab
          </div>
          <div
            className="bg-black w-10 h-32 ml-5 -mr-5 z-10 text-red-500 border-red-500 border-2 text-center flex items-end justify-center"
            onClick={playBb4}
          >
            Bb
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-5">
        <button
          className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
          onClick={play}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default Piano;
