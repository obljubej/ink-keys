import * as Tone from "tone";


export function playC4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  }
  export function playDb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Db4", "8n");
  }
  export function playD4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("D4", "8n");
  }
  export function playEb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Eb4", "8n");
  }
  export function playE4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("E4", "8n");
  }
  export function playF4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("F4", "8n");
  }
  export function playGb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Gb4", "8n");
  }
  export function playG4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("G4", "8n");
  }
  export function playAb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Ab4", "8n");
  }
  export function playA4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("A4", "8n");
  }
  export function playBb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Bb4", "8n");
  }
  export function playB4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("B4", "8n");
  }
  export function playC5() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C5", "8n");
  }



// use query select to change the color to green when note is being clicked
  export function play() {
    const notes = ["C5", "B4", "Bb4", "A4", "Ab4"];
    
    function playNoteSequentially(index = 0) {
        if (index < notes.length) {
            const note = notes[index];
            setTimeout(() => {
                switch (note) {
                    case "C5":
                        playC5();
                        break;
                    case "B4":
                        playB4();
                        break;
                    case "Bb4":
                        playBb4();
                        break;
                    case "A4":
                        playA4();
                        break;
                    case "Ab4":
                        playAb4();
                        break;
                    default:
                        break;
                }
                playNoteSequentially(index + 1);  // Move to the next note
            }, 1000);  // 1-second delay between notes
        }
    }

    playNoteSequentially();
}
