import "../fonts.css";
import "../lib/style.css";

import { configGlobal, configHateSpeech } from "../../config.js";
import { setupInputBackend, spoofInputBackend } from "../lib/control/control.js";
import { getDifficulty } from "../lib/difficulty.js";
import { initAfterLoad } from "../lib/init.js";
import { hideModal, showModal } from "../lib/meta/modal.js";
import { Timer } from "../lib/timer/timer.js";

const DIFFICULTY = getDifficulty();
let helpModal;
let currentTryInputs = [];
let resetTimer;

function onInput({ detail }) {
    const button = detail.button;
    console.log("btn", button);

    // on ANY input, reset timer
    if (resetTimer) resetTimer.reset();

    if (button === "buttonStart") {
        //
    }

    if (button === "buttonHelp") {
        if (helpModal) {
            hideModal(helpModal);
            helpModal = null;
        } else {
            helpModal = showModal({
                text: configHateSpeech.helpText,
            });
        }
    }

    // Disallow other key events when help is shown
    if (helpModal) return;

    // Number buttons input
    for (let i = 1; i < 7; i++) {
        if (button === "button" + i) {
            if (currentTryInputs.includes(i)) return;
            currentTryInputs.push(i);

            updateProgress(currentTryInputs, configHateSpeech.solutions[DIFFICULTY]);
            const correct = compareSolution(currentTryInputs, configHateSpeech.solutions[DIFFICULTY]);
            if (correct) {
                solveGame();
            } else if (isInputFinished(currentTryInputs, configHateSpeech.solutions[DIFFICULTY])) {
                resetGame();
            }
        }
    }
}

function resetGame() {
    // reload page
    window.location.reload();
}

function solveGame() {
    console.log(document.querySelector("a.solve"));
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
    setupInputBackend();

    // spoof input
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            spoofInputBackend(1, "buttonStart");
        } else if (event.key === "Escape") {
            spoofInputBackend(1, "buttonHelp");
        } else {
            const keyNum = parseInt(event.key, 10);
            if (keyNum >= 1 && keyNum < 8) {
                spoofInputBackend(1, "button" + keyNum.toString());
            }
        }
    });

    // listen
    document.addEventListener("input:game1", onInput);

    // game specific
    updateProgress(currentTryInputs, configHateSpeech.solutions[DIFFICULTY]);

    resetTimer = new Timer(configGlobal.resetTimerSeconds, () => {
        // timeout is up, navigate back to start
        document.querySelector("a.reset").click();
    });
    resetTimer.start();
});
