import "../fonts.css";
import "../lib/style.css";

import { configEmotions, configGlobal } from "../../config.js";
import { colorOverwrite } from "../lib/color.js";
import { setupInputBackend, spoofInputBackend } from "../lib/control/control.js";
import { getDifficulty, setupDifficultyListener } from "../lib/difficulty.js";
import { initAfterLoad } from "../lib/init.js";
import { hideModal, showModal } from "../lib/meta/modal.js";
import { Timer } from "../lib/timer/timer.js";

const DIFFICULTY = getDifficulty();

let helpModal;
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
                text: configEmotions.helpText,
            });
        }
    }

    // Disallow other key events when help is shown
    if (helpModal) return;

    if (button === "buttonSolve") {
        solveGame();
    }
}

function solveGame() {
    document.querySelector("a.solve").click();
}

initAfterLoad(() => {
    setupDifficultyListener();
    setupInputBackend();

    // spoof input
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            spoofInputBackend(3, "buttonStart");
        } else if (event.key === "Escape") {
            spoofInputBackend(3, "buttonHelp");
        } else if (event.key === "1") {
            spoofInputBackend(3, "buttonSolve");
        }
    });

    // listen
    document.addEventListener("input:game3", onInput);

    for (let i = 1; i <= 3; i++) {
        // add video source child element
        const video = document.querySelector(`video.video-${i}`);
        const source = document.createElement("source");
        source.src = import.meta.env.BASE_URL + `content/emotions/vid${i}_${DIFFICULTY}.mp4`;
        source.type = "video/mp4";
        console.log(source);
        video.appendChild(source);
        video.play();
    }

    // game specific
    colorOverwrite(document.querySelector("main"), configEmotions.colorOverwrite);
    document.querySelector("h1").textContent = configEmotions.questionText;

    resetTimer = new Timer(configGlobal.resetTimerSeconds, () => {
        // timeout is up, navigate back to start
        document.querySelector("a.reset").click();
    });
    resetTimer.start();
});
