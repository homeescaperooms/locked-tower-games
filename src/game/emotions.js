import "../fonts.css";
import "../lib/style.css";

import { setupInputBackend, spoofInputBackend } from "../lib/control/control.js";
import { initAfterLoad } from "../lib/init.js";
import { hideModal, showModal } from "../lib/meta/modal.js";
import { Timer } from "../lib/timer/timer.js";

/* config */
const HELP_TEXT = "hilfe für emotions";
const RESET_TIMER_SECONDS = 120;

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
                text: HELP_TEXT,
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

    // game specific
    resetTimer = new Timer(RESET_TIMER_SECONDS, () => {
        // timeout is up, navigate back to start
        document.querySelector("a.reset").click();
    });
    resetTimer.start();
});
