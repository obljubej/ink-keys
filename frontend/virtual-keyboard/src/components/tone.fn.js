import * as Tone from "tone";
import '../index.css';

export function playC4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
    animateKey('C4');
}
export function playDb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Db4", "8n");
    animateKey('Db4');
}
export function playD4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("D4", "8n");
    animateKey('D4');
}
export function playEb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Eb4", "8n");
    animateKey('Eb4');
}
export function playE4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("E4", "8n");
    animateKey('E4');
}
export function playF4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("F4", "8n");
    animateKey('F4');
}
export function playGb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Gb4", "8n");
    animateKey('Gb4');
}
export function playG4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("G4", "8n");
    animateKey('G4');
}
export function playAb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Ab4", "8n");
    animateKey('Ab4');
}
export function playA4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("A4", "8n");
    animateKey('A4');
}
export function playBb4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("Bb4", "8n");
    animateKey('Bb4');
}
export function playB4() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("B4", "8n");
    animateKey('B4');
}
export function playC5() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C5", "8n");
    animateKey('C5');
}
// "C5", "B4", "Bb4", "A4", "Ab4"
// for the play button feature, not specifically for the virtual keyboard
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
                playNoteSequentially(index + 1);
            }, 500);
        }
    }

    playNoteSequentially();
}

export function animateKey(note) {
    const key = document.querySelector(`[data-note="${note}"]`);
    if (key) {
        console.log('Animating key:', note);  // Debug to check which key is found
        console.log('Class Name:', key.className);
        key.classList.add('active');

        // Apply CSS animation inline
        key.style.transition = 'transform 0.1s ease-in-out';
        if (key.classList.contains('white-key')) {
            key.style.backgroundColor = 'darkgray';
            key.style.transform = 'scale(0.97)';
            key.style.border = '2px solid green';  // Green border

        } else if (key.classList.contains('black-key')) {
            key.style.backgroundColor = 'rgb(96, 96, 96)';
            key.style.transform = 'scale(0.99)';
            key.style.border = '2px solid green';  // Green border
        }

        // Remove after animation duration
        setTimeout(() => {
            key.classList.remove('active');
            key.style.backgroundColor = '';  // Reset to default
            key.style.transform = '';        // Reset to default
            key.style.border = '';
        }, 200);  // Duration of the CSS transition
    }
}
