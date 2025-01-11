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
  animateKey,
} from "./tone.fn.js";

const Piano = () => {
  return (
    <div className="piano-page">
      <h1 className="text-center text-4xl font-bold my-8">Piano</h1>
      <div className="piano">
        <div
          className="white-key"
          data-note="C4"
          onClick={() => {
            playC4();
            animateKey("C4");
          }}
        >
          C
        </div>
        <div
          className="black-key"
          data-note="Db4"
          onClick={() => {
            playDb4();
            animateKey("Db4");
          }}
        >
          Db
        </div>
        <div
          className="white-key"
          data-note="D4"
          onClick={() => {
            playD4();
            animateKey("D4");
          }}
        >
          D
        </div>
        <div
          className="black-key"
          data-note="Eb4"
          onClick={() => {
            playEb4();
            animateKey("Eb4");
          }}
        >
          Eb
        </div>
        <div
          className="white-key"
          data-note="E4"
          onClick={() => {
            playE4();
            animateKey("E4");
          }}
        >
          E
        </div>
        <div
          className="white-key"
          data-note="F4"
          onClick={() => {
            playF4();
            animateKey("F4");
          }}
        >
          F
        </div>
        <div
          className="black-key"
          data-note="Gb4"
          onClick={() => {
            playGb4();
            animateKey("Gb4");
          }}
        >
          Gb
        </div>
        <div
          className="white-key"
          data-note="G4"
          onClick={() => {
            playG4();
            animateKey("G4");
          }}
        >
          G
        </div>
        <div
          className="black-key"
          data-note="Ab4"
          onClick={() => {
            playAb4();
            animateKey("Ab4");
          }}
        >
          Ab
        </div>
        <div
          className="white-key"
          data-note="A4"
          onClick={() => {
            playA4();
            animateKey("A4");
          }}
        >
          A
        </div>
        <div
          className="black-key"
          data-note="Bb4"
          onClick={() => {
            playBb4();
            animateKey("Bb4");
          }}
        >
          Bb
        </div>
        <div
          className="white-key"
          data-note="B4"
          onClick={() => {
            playB4();
            animateKey("B4");
          }}
        >
          B
        </div>
        <div
          className="white-key"
          data-note="C5"
          onClick={() => {
            playC5();
            // animateKey("C5");
          }}
        >
          C
        </div>
      </div>

      <div className="playbtn">
        <button className="btn" onClick={play}>
          Play
        </button>
      </div>
    </div>
  );
};

export default Piano;
