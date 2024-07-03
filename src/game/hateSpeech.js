import "../fonts.css";
import "../lib/style.css";

import { inputGeneric, inputHateSpeech, onInputBackend } from "../lib/control/control.js";
import { spoofGenericInput, spoofHateSpeechInput } from "../lib/control/controlSpoof.js";
import { initAfterLoad } from "../lib/init.js";
import { hideModal, showModal } from "../lib/meta/modal.js";
import { Timer } from "../lib/timer/timer.js";

/* config */
const DIFFICULTY = "easy"; // "easy" or "hard"
const HELP_TEXT = "hilfe für hate speech";
const RESET_TIMER_SECONDS = 120;
const SOLUTIONS = {
    easy: [1, 2, 3, 4],
    hard: [8, 7, 6, 5, 4, 3, 2, 1],
};

let helpModal;
let currentTryInputs = [];
let resetTimer;

function onInput(keyName) {
    // on ANY input, reset timer
    if (resetTimer) resetTimer.reset();

    if (keyName === inputGeneric.BUTTON_START) {
        //
    }

    if (keyName === inputGeneric.BUTTON_HELP) {
        if (helpModal) {
            hideModal(helpModal);
            helpModal = null;
        } else {
            helpModal = showModal({
                text: HELP_TEXT,
            });
        }
    }

    // Disallow other key events when help is shown
    if (helpModal) return;

    const afterInput = () => {
        updateProgress(currentTryInputs, SOLUTIONS[DIFFICULTY]);
        const correct = compareSolution(currentTryInputs, SOLUTIONS[DIFFICULTY]);
        if (correct) solveGame();

        if (isInputFinished(currentTryInputs, SOLUTIONS[DIFFICULTY])) {
            resetGame();
        }
    };

    if (keyName === inputHateSpeech.BUTTON_1) {
        if (currentTryInputs.includes(1)) return;
        currentTryInputs.push(1);
        afterInput();
    }

    if (keyName === inputHateSpeech.BUTTON_2) {
        if (currentTryInputs.includes(2)) return;
        currentTryInputs.push(2);
        afterInput();
    }

    if (keyName === inputHateSpeech.BUTTON_3) {
        if (currentTryInputs.includes(3)) return;
        currentTryInputs.push(3);
        afterInput();
    }

    if (keyName === inputHateSpeech.BUTTON_4) {
        if (currentTryInputs.includes(4)) return;
        currentTryInputs.push(4);
        afterInput();
    }

    if (keyName === inputHateSpeech.BUTTON_5) {
        if (currentTryInputs.includes(5)) return;
        currentTryInputs.push(5);
        afterInput();
    }

    if (keyName === inputHateSpeech.BUTTON_6) {
        if (currentTryInputs.includes(6)) return;
        currentTryInputs.push(6);
        afterInput();
    }

    if (keyName === inputHateSpeech.BUTTON_7) {
        if (currentTryInputs.includes(7)) return;
        currentTryInputs.push(7);
        afterInput();
    }

    if (keyName === inputHateSpeech.BUTTON_8) {
        if (currentTryInputs.includes(8)) return;
        currentTryInputs.push(8);
        afterInput();
    }
}

function resetGame() {
    // reload page
    window.location.reload();
}

function solveGame() {
    document.querySelector("a.solve").click();
}

function updateProgress(currentSolution, correctSolution) {
    let innerString = "";
    for (let i = 0; i < correctSolution.length; i++) {
        const isFilledOut = i < currentSolution.length;
        let content = null;
        if (isFilledOut) content = currentSolution[i];
        innerString += `<div class="indicator ${isFilledOut ? "filled" : ""}">${isFilledOut ? "<span>" + content + "</span>" : ""}</div>`;
    }

    document.querySelector(".progress").innerHTML = innerString;
}

function compareSolution(currentSolution, correctSolution) {
    if (currentSolution.length !== correctSolution.length) return false;

    for (let i = 0; i < currentSolution.length; i++) {
        if (currentSolution[i] !== correctSolution[i]) return false;
    }

    return true;
}

function isInputFinished(currentSolution, correctSolution) {
    if (currentSolution.length < correctSolution.length) return false;
    return true;
}

initAfterLoad(() => {
    onInputBackend((topic, payload) => {
        console.log("ui builder input from hate speech", topic, payload)
    });

    spoofGenericInput(onInput);
    spoofHateSpeechInput(onInput);
    updateProgress(currentTryInputs, SOLUTIONS[DIFFICULTY]);

    resetTimer = new Timer(RESET_TIMER_SECONDS, () => {
        // timeout is up, navigate back to start
        document.querySelector("a.reset").click();
    });
    resetTimer.start();
});
