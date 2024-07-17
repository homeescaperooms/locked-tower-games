import "../fonts.css";
import "../lib/style.css";

import { configGlobal, configUnknownLanguage } from "../../config.js";
import { sleep } from "../helper.js";
import { colorOverwrite } from "../lib/color.js";
import { setupInputBackend, spoofInputBackend } from "../lib/control/control.js";
import { getDifficulty, setupDifficultyListener } from "../lib/difficulty.js";
import { initAfterLoad } from "../lib/init.js";
import { hideModal, showModal } from "../lib/meta/modal.js";
import { Timer } from "../lib/timer/timer.js";

const DIFFICULTY = getDifficulty();

let helpModal;
let currentTryInputs = [];
let resetTimer;
let blockAllInputs = false;

async function onInput({ detail }) {
    const button = detail.button;
    console.log("btn", button);

    // blocking inputs
    if (blockAllInputs) return;

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
                text: configUnknownLanguage.helpText[DIFFICULTY],
            });
        }
    }

    // Disallow other key events when help is shown
    if (helpModal) return;

    const afterInput = async () => {};

    // Number buttons input
    for (let i = 1; i < 7; i++) {
        if (button === "button" + i) {
            currentTryInputs.push(i);

            console.log(currentTryInputs, configUnknownLanguage.solutions[DIFFICULTY]);
            updateProgress(currentTryInputs, configUnknownLanguage.solutions[DIFFICULTY]);
            const correct = compareSolution(currentTryInputs, configUnknownLanguage.solutions[DIFFICULTY]);
            if (correct) {
                solveGame();
            } else if (isInputFinished(currentTryInputs, configUnknownLanguage.solutions[DIFFICULTY])) {
                await resetGame();
            }
        }
    }
}

function setFeedback(text) {
    const el = document.querySelector(".feedback");
    el.textContent = text.length === 0 ? "&nbsp;" : text;
    el.style.opacity = text.length > 0 ? 1 : 0;
}

async function resetGame() {
    blockAllInputs = true;
    setFeedback(configUnknownLanguage.gameOverText);
    await sleep(configGlobal.autoRestartSeconds * 1000);
    // reload page
    window.location.reload();
    blockAllInputs = false;
}

function solveGame() {
    document.querySelector("a.solve").click();
}

function updateProgress(currentSolution, correctSolution) {
    let innerString = '<span class="input-text">Eingabe: </span>';

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
    setupDifficultyListener();
    setupInputBackend();

    // spoof input
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            spoofInputBackend(2, "buttonStart");
        } else if (event.key === "Escape") {
            spoofInputBackend(2, "buttonHelp");
        } else {
            const keyNum = parseInt(event.key, 10);
            if (keyNum >= 1 && keyNum < 9) {
                spoofInputBackend(2, "button" + keyNum.toString());
            }
        }
    });

    // listen
    document.addEventListener("input:game2", onInput);

    // game specific
    colorOverwrite(document.querySelector("main"), configUnknownLanguage.colorOverwrite);
    document.querySelector("h1").textContent = configUnknownLanguage.questionText;

    updateProgress(currentTryInputs, configUnknownLanguage.solutions[DIFFICULTY]);

    // add video source child element
    const video = document.querySelector("video");
    const source = document.createElement("source");
    source.src = import.meta.env.BASE_URL + `content/unknown_language/video_${DIFFICULTY}.mp4`;
    source.type = "video/mp4";
    video.appendChild(source);
    video.play();

    resetTimer = new Timer(configGlobal.resetTimerSeconds, () => {
        // timeout is up, navigate back to start
        document.querySelector("a.reset").click();
    });
    resetTimer.start();
});
