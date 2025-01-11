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
  play
} from "./tone.fn.js";

const Piano = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center">Piano</h1>
      <div className="flex justify-center">
        <div className="border border-black w-24 h-96 bg-white text-red text-center" onClick={playC4}>C</div>
        <div className="bg-black w-15 h-64 -ml-8 -mr-8 z-10 text-red text-center" onClick={playDb4}>D</div>
        <div className="border border-black w-24 h-96 bg-white text-red text-center" onClick={playD4}>D</div>
        <div className="bg-black w-15 h-64 -ml-8 -mr-8 z-10 text-red text-center" onClick={playEb4}>D</div>
        <div className="border border-black w-24 h-96 bg-white text-red text-center" onClick={playE4}>D</div>
        <div className="border border-black w-24 h-96 bg-white text-red text-center" onClick={playF4}>F</div>
        <div className="bg-black w-15 h-64 -ml-8 -mr-8 z-10 text-red text-center" onClick={playGb4}>T</div>
        <div className="border border-black w-24 h-96 bg-white text-red text-center" onClick={playG4}>G</div>
        <div className="bg-black w-15 h-64 -ml-8 -mr-8 z-10 text-red text-center" onClick={playAb4}>Y</div>
        <div className="border border-black w-24 h-96 bg-white text-red text-center" onClick={playA4}>H</div>
        <div className="bg-black w-15 h-64 -ml-8 -mr-8 z-10 text-red text-center" onClick={playBb4}>U</div>
        <div className="border border-black w-24 h-96 bg-white text-red text-center" onClick={playB4}>J</div>
        <div className="border border-black w-24 h-96 bg-white text-red text-center" onClick={playC5}>K</div>
      </div>
      <div className="flex justify-center items-center mt-5">
        <button className="cursor-pointer" onClick={play}>Play</button>
      </div>
    </div>
  );
}

export default Piano;